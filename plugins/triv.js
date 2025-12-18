const axios = require('axios');
const { cmd } = require('../command');

cmd({
  pattern: 'quiz',
  alias: ['q'],
  desc: 'Fetches a quiz question from an API with live timer',
  category: 'fun',
  use: '.quiz',
  filename: __filename,
}, async (conn, mek, msg, { from, sender, args, reply }) => {
  try {
    // Fetch a quiz question from the API
    const response = await axios.get('https://the-trivia-api.com/v2/questions?limit=1');
    const questionData = response.data[0];

    if (!questionData) {
      return reply('❌ Failed to fetch a quiz question. Please try again later.');
    }

    const { question, correctAnswer, incorrectAnswers } = questionData;
    const options = [...incorrectAnswers, correctAnswer];
    shuffleArray(options);

    // Send the question and options to the user
    const optionsText = options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join('\n');
    const questionMsg = await reply(`🎯 *Question:* ${question.text}\n\n${optionsText}\n\n⏰ Time left: 20 seconds\n\nReply with the letter (A, B, C, or D) corresponding to your choice.`);

    let timeLeft = 20;
    let answered = false;
    
    // Create and send initial timer message
    let timerMsg = await conn.sendMessage(from, { 
      text: `🕒 Time remaining: *${timeLeft}s*` 
    }, { quoted: questionMsg });

    // Update timer every second
    const timerInterval = setInterval(async () => {
      if (answered) {
        clearInterval(timerInterval);
        return;
      }
      
      timeLeft--;
      
      try {
        // Edit the timer message with new time
        await conn.sendMessage(from, {
          text: `🕒 Time remaining: *${timeLeft}s*`,
          edit: timerMsg.key
        });
      } catch (editError) {
        // If edit fails, send new message (fallback)
        try {
          timerMsg = await conn.sendMessage(from, { 
            text: `🕒 Time remaining: *${timeLeft}s*` 
          });
        } catch (e) {
          // Ignore if can't send timer update
        }
      }

      // Time's up
      if (timeLeft <= 0 && !answered) {
        clearInterval(timerInterval);
        answered = true;
        conn.ev.off('messages.upsert', messageHandler);
        
        // Update timer to show time's up
        try {
          await conn.sendMessage(from, {
            text: "⏰ *TIME'S UP!*",
            edit: timerMsg.key
          });
        } catch (e) {
          await conn.sendMessage(from, { text: "⏰ *TIME'S UP!*" });
        }
        
        await conn.sendMessage(from, { 
          text: `⏰ Time's up! The correct answer was: *${correctAnswer}*` 
        }, { quoted: questionMsg });
      }
    }, 1000);

    // Message handler for answers
    const messageHandler = async (message) => {
      if (answered) return;
      
      const msg = message.messages[0];
      if (!msg || !msg.message) return;
      
      const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
      const userJid = msg.key.participant || msg.key.remoteJid;
      
      // Check if it's from the same user in the same chat
      if (userJid === sender && msg.key.remoteJid === from) {
        const userAnswer = text.trim().toUpperCase();
        
        if (/^[A-D]$/.test(userAnswer)) {
          answered = true;
          clearInterval(timerInterval);
          conn.ev.off('messages.upsert', messageHandler);
          
          // Update timer to show answered
          try {
            await conn.sendMessage(from, {
              text: "✅ *ANSWERED*",
              edit: timerMsg.key
            });
          } catch (e) {
            // Ignore edit error
          }
          
          const isCorrect = options[userAnswer.charCodeAt(0) - 65] === correctAnswer;
          
          if (isCorrect) {
            await conn.sendMessage(from, { 
              text: '🎉 *CORRECT!* Well done! ✅\n\nThe answer was indeed: ' + correctAnswer 
            }, { quoted: msg });
          } else {
            const userChoice = options[userAnswer.charCodeAt(0) - 65];
            await conn.sendMessage(from, { 
              text: `❌ *INCORRECT!*\n\nYou chose: ${userChoice}\nCorrect answer: *${correctAnswer}*` 
            }, { quoted: msg });
          }
        }
      }
    };

    // Listen for messages
    conn.ev.on('messages.upsert', messageHandler);

    // Safety timeout to cleanup after 25 seconds
    setTimeout(() => {
      if (!answered) {
        answered = true;
        clearInterval(timerInterval);
        conn.ev.off('messages.upsert', messageHandler);
      }
    }, 25000);

  } catch (error) {
    console.error('Error fetching quiz data:', error);
    reply('❌ Failed to fetch quiz data. Please try again later.');
  }
});

// Shuffle an array in place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
      }
