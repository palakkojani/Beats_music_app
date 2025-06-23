import { faker } from "@faker-js/faker";

export function generateMusic(){
    return {
        id:  faker.number.int(500),
        name: faker.music.songName(),
        album: faker.music.album(),
        artist: faker.music.artist(),
        cover: faker.image.personPortrait()
    }
}

export function getMusic(count){
    const data = []
    for(let i=0;i<count;i++){
        const music = generateMusic()
        data.push(music)
    }
    return data
}

console.log(getMusic(10))