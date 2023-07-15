const ytdl = require("ytdl-core");
const fs = require("fs");
const readline = require("readline");


/**
 * 
 * @param {string} name 
 */
function cleanFileName(name){
    return name.trim().replaceAll(/[!@#$%^&*\-+=~`:;"',.<>/?\\|()\[\]{}]/g, "");
}


/**
 * 
 * @param {string} url 
 */
async function downloadVideo(url, index = -1){
    try{
        const videoInfo = await ytdl.getInfo(url);
        const { videoDetails } = videoInfo;
        const message = `Baixando ${videoDetails.title}...`;
        const fileName = `${(index>=0)?"["+index.toString().padStart(2,'0')+"]":""} ${videoDetails.title}`;
    
        console.log(message);
    
        const data = ytdl.downloadFromInfo(videoInfo, {
            quality: "highestaudio",
            format: "mp3"
        });
        data.pipe(fs.createWriteStream(`out/${cleanFileName(fileName)}.mp3`));
    }catch(err){
        throw err;
    }
}


async function input(title = null){
    const label = (title)?title:"";
    return await new Promise(resolve=>{
        reader.question(label, resolve);
    });
}


const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let ERROR_MESSAGE = "";

async function main(){
    let menuState = 100;

    const presentLogo = ()=>{
        console.log("========== MUSIKER ==========");
        console.log("   -------- v0.1 --------    ");
    }

    const presentMainMenu = async () =>{
        console.log("Insira o numero da opção desejada:");
        console.log("1 - Baixar música.");
        console.log("3 - Sair.");

        const option = Number(await input());
        if(option == 3){
            menuState = 0;
        }else{
            if(option > 0 && option < 3){
                menuState = option;
            }
        }
    };


    const presentAppMenu = async (single)=>{
        const header = (single)?"Insira a url da musica: ":"Insira a url da playlist: ";
    
        console.log(header);
        console.log("0 - Voltar.");

        const option = await input();
        
        if(Number.isSafeInteger(Number(option)) && option == 0){
            menuState = 3;
            return;
        }

        // tratar input como url
        if(!ytdl.validateURL(option)){
            ERROR_MESSAGE = "URL INVÁLIDA!: "+option;
            return;
        }

        if(!single){
            // Playlists
            ERROR_MESSAGE = "ESTA FUNCIONALIDADE NÃO ESTÃO DISPONÍVEIS";
            return;
        }

        ERROR_MESSAGE = "";
        await downloadVideo(option);
    }

    const presentSingleMenu = async () =>{
        return await presentAppMenu(true);
    };


    const presentPlaylistMenu = async () =>{
        return await presentAppMenu(false);
    };

    presentLogo();
    do{
        try{
            // console.clear();
            console.log(ERROR_MESSAGE);
            switch(menuState){
                case 1:
                    await presentSingleMenu();
                    break;
                case 3:
                default:
                    await presentMainMenu();
                    break;
            }
        }catch(err){
            console.log("Error ocurried: ", err);
            return;
        }
    }while(menuState > 0);

    console.log("Programa finalizado.");
    reader.close();
}

main();
// downloadVideo("https://www.youtube.com/watch?v=hnsVuId3EKw", 2);