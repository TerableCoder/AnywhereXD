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
    /*const templateIdToGameId = {
        "9903": "3518437209324318",
        "9805": "3518437209372133",
        "9904": "3518437209337218",
        "9905": "3518437209335804",
        "2058": "3518437209367528",
        "2059": "3518437209394117",
        "2109": "3518437209367634",
        "2019": "3518437209392877",
        "2020": "3518437209379780",
        "2046": "3518437209383315",
        "2045": "3518437209405223"};*/
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


        /*
        if(requestType == "angler"){ // works
            let npc = NPCs.find(o => o.templateId == 9904);
            if(!npc) return;
            mod.toServer('C_REQUEST_CONTRACT', 2, {
                type: 20,
                gameId: npc.gameId,
                button: 16095,
                name: "",
                data: Buffer.from([ 223, 62, 0, 0 ])
            })
        } else if(requestType == "merchantf"){
            let npc = NPCs.find(o => o.templateId == 9903);
            if(!npc) return;
            mod.toServer('C_REQUEST_CONTRACT', 2, {
                type: 9,
                gameId: npc.gameId,
                button: 16094,
                name: "",
                data: Buffer.from([ 222, 62, 0, 0 ])
            })
        } else if(requestType == "merchant"){
            let npc = NPCs.find(o => o.templateId == 2019);
            if(!npc) return;
            mod.toServer('C_REQUEST_CONTRACT', 2, {
                type: 9,
                gameId: npc.gameId,
                button: 70310,
                name: "",
                data: Buffer.from([ 166, 18, 1, 0 ])
            })
        } else if(requestType == "fish"){
            let npc = NPCs.find(o => o.templateId == 9905);
            if(!npc) return;
            mod.toServer('C_REQUEST_CONTRACT', 2, {
                type: 93,
                gameId: npc.gameId,
                button: 1000,
                name: "",
                data: Buffer.from([ 232, 3, 0, 0 ])
            })
        } else if(requestType == "hustler"){
            let npc = NPCs.find(o => o.templateId == 2046);
            if(!npc) return;
            mod.toServer('C_REQUEST_CONTRACT', 2, {
                type: 9,
                gameId: npc.gameId,
                button: 251,
                name: "",
                data: Buffer.from([ 251, 0, 0, 0 ])
            })
        } else if(requestType == "bell"){ // works
            let npc = NPCs.find(o => o.templateId == 2045);
            if(!npc) return;
            mod.toServer('C_REQUEST_CONTRACT', 2, {
                type: 50,
                gameId: npc.gameId,
                button: 141,
                name: "",
                data: Buffer.from([ 141, 0, 0, 0 ])
            })
        } else if(requestType == "vang1"){
            let npc = NPCs.find(o => o.templateId == 2059);
            if(!npc) return;
            mod.toServer('C_REQUEST_CONTRACT', 2, {
                type: 49,
                gameId: npc.gameId,
                button: 6090,
                name: "",
                data: Buffer.from([ 202, 23, 0, 0 ])
            })
        } else if(requestType == "vang2"){
            let npc = NPCs.find(o => o.templateId == 2058);
            if(!npc) return;
            mod.toServer('C_REQUEST_CONTRACT', 2, {
                type: 49,
                gameId: npc.gameId,
                button: 609,
                name: "",
                data: Buffer.from([ 97, 2, 0, 0 ])
            })
        } else if(requestType == "spec"){
            let npc = NPCs.find(o => o.templateId == 2109);
            if(!npc) return;
            mod.toServer('C_REQUEST_CONTRACT', 2, {
                type: 9,
                gameId: npc.gameId,
                button: 250,
                name: "",
                data: Buffer.from([ 250, 0, 0, 0 ])
            })
        } else if(requestType == "crate"){ // find stuff for 
            let npc = NPCs.find(o => o.templateId == 9805);
            if(!npc) return;
            mod.toServer('C_REQUEST_CONTRACT', 2, {
                type: 93,
                gameId: npc.gameId,
                button: "1001",
                name: "",
                data: Buffer.from([ 233, 3, 0, 0 ])
            })
        } else if(requestType == "bank"){
            let npc = NPCs.find(o => o.templateId == 2020);
            if(!npc) return;
            mod.toServer('C_REQUEST_CONTRACT', 2, {
                type: 26,
                gameId: npc.gameId,
                button: 0,
                name: "",
                data: Buffer.from([ 0, 0, 0, 0 ])
            })
        }*/
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

    /*mod.hook('S_DESPAWN_NPC', 3, e => {
		let i = NPCs.findIndex(o => o.gameId == e.gameId);
		if(i >= 0) NPCs.splice(i, 1);
	});*/

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
