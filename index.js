module.exports = function AnywhereXD(mod) {
    const cmd = mod.command || mod.require.command;
    mod.game.initialize('inventory');
    
    let NPCs = [];
    const relNpcs = [9905, 9904, 9903, 9805, 2019, 2020, 2045, 2046, 2058, 2059, 2109];
    const nameToTemplateId = {
        "merchantf":"9903",
        "crate":"9805",
        "angler":"9904",
        "fish":"9905",
        "vang2":"2058",
        "vang1":"2059",
        "spec":"2109",
        "merchant":"2019",
        //"bank":"2020",
        "hustler":"2046",
        "bell":"2045"};
    const templateIdToType = {
        "9903": "9",
        "9805": "93",
        "9904": "20",
        "9905": "93",
        "2058": "49",
        "2059": "49",
        "2109": "9",
        "2019": "9",
        "2020": "26",
        "2046": "9",
        "2045": "50"};
    const templateIdToButton = {
        "9903": "16094",
        "9805": "1001",
        "9904": "20",
        "9905": "1000",
        "2058": "609",
        "2059": "6090",
        "2109": "250",
        "2019": "70310",
        "2020": "0",
        "2046": "251",
        "2045": "141"};
    const templateIdToData = {
        "9903": [ 222, 62, 0, 0 ],
        "9805": [ 233, 3, 0, 0 ],
        "9904": [ 223, 62, 0, 0 ],
        "9905": [ 232, 3, 0, 0 ],
        "2058": [ 97, 2, 0, 0 ],
        "2059": [ 202, 23, 0, 0 ],
        "2109": [ 250, 0, 0, 0 ],
        "2019": [ 166, 18, 1, 0 ],
        "2020": [ 0, 0, 0, 0 ],
        "2046": [ 251, 0, 0, 0 ],
        "2045": [ 141, 0, 0, 0 ]
    };
    

    function sendCRC(requestType){
        let tid = nameToTemplateId[requestType];
        if(!tid){
            cmd.message(`${requestType} invalid command`);
            cmd.message("anyw: ");
            for(const request in nameToTemplateId){
                cmd.message(`${request}`);
            }
            return;
        }
        mod.toServer('C_REQUEST_CONTRACT', 2, {
            type: templateIdToType[tid],
            gameId: mod.settings.GID[tid],
            button: templateIdToButton[tid],
            name: "",
            data: Buffer.from(templateIdToData[tid])
        })
    }

    
    mod.hook('S_SPAWN_NPC', 11, (e) => {
        if(relNpcs.includes(e.templateId) && e.relation == 12){
			if(!NPCs.find(o => o.gameId == e.gameId)){
                NPCs.push({
                    gameId: e.gameId,
                    templateId: e.templateId
                });
            }
            mod.settings.GID[e.templateId] = String(e.gameId);
			mod.saveSettings();
		}
    });

    cmd.add(['anyw'], { 
		$none(){
            cmd.message("anyw: ");
            for(const request in nameToTemplateId){
                cmd.message(`${request}`);
            }
        },
		$default(x){
            sendCRC(x);
        }
    });
    cmd.add(['anpc'], { 
		$default(){
            for(const npc in NPCs){
                cmd.message(`${NPCs[npc].templateId} ~ ${String(NPCs[npc].gameId)}`);
                console.log(`${NPCs[npc].templateId} ~ ${String(NPCs[npc].gameId)}`);
            }
        }
	});
}
