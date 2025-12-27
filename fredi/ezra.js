
var tabCmds = [];
let cm = [];
function ezra(obj, fonctions) {
    let infoComs = obj;
    if (!obj.categorie) {
        infoComs.categorie = "General";
    }
    if (!obj.reaction) {
        infoComs.reaction = "🫧";
    }
    infoComs.fonction = fonctions;
    // Prevent duplicate command registrations (same nomCom)
    try {
        const existing = cm.find(c => c.nomCom && infoComs.nomCom && c.nomCom === infoComs.nomCom);
        if (existing) {
            console.log(`Skipping duplicate command registration: ${infoComs.nomCom}`);
            return existing;
        }
    }
    catch (e) { /* ignore */ }
    cm.push(infoComs);
    // console.log('chargement...')
    return infoComs;
}
module.exports = { ezra, Module: ezra, cm };
