const APP_ID = "c5ba0d5021ca49a4989abd70a2bc0ea9";
const TOKEN = "007eJxTYLg1ocrsbXCkE8fO+aqdzEvm1f937vtyvvJL7svKwldiT3gUGJJNkxINUkwNjAyTE00sgcjCMjEpxdwg0Sgp2SA10XK2e05qQyAjwxepfhZGBggE8VkYchMz8xgYAMM1IRk=";

const CHANNEL = "main";

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

var localUid;

let localTracks = []
/*
localTracks[0] is audio (voice),
localTracks[1] is video,
*/

var countRemotePeer = 0;

async function joinAndDisplayLocalStream(uid, typeCall) {

    localUid = uid;
    console.log("uid = " + localUid);

    await client.join(APP_ID, CHANNEL, TOKEN, uid);

    if (typeCall == "voice") {
        localTracks.push(await AgoraRTC.createMicrophoneAudioTrack());
        /*
        Phân biệt:
        - MicrophoneAudioTrack: là theo dõi âm thanh từ mic
        - AudioTrack: là âm thanh phát ra từ máy tính
        */
        await client.publish(localTracks[0])
    }

    if (typeCall == "video") {
        // Lấy cả Mic Audio và Camera Video Track
        localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

        // Publish localTracks to Channel
        await client.publish([localTracks[0], localTracks[1]]);
    }

    client.on('user-published', handleUserPublished);

    client.on('user-left', (user) => {
        console.log(user.uid + " has left the chanel");
    });
}

async function handleUserPublished(user, mediaType) {
    countRemotePeer++;

    if (countRemotePeer > 0) {
        // Display local video 
        localTracks[1].play(`peer-${localUid}`);
    }

    await client.subscribe(user, mediaType)

    if (mediaType == 'video') {
        user.videoTrack.play(`peer-${user.uid}`)
        // document.getElementById(`peerInfo-${user.uid}`).style = "z-index: 0";
    }

    if (mediaType == 'audio') {
        user.audioTrack.play();
    }
}

async function toggleMic() {
    if (localTracks[0].muted) {
        await localTracks[0].setMuted(false);
    } else {
        await localTracks[0].setMuted(true);
    }
}

async function toggleVideo() {
    // Kiểm tra xem đã có có video track chưa
    if (localTracks.length == 1) {
        /*
        Chưa có video track
        tức là video-btn đang turn off
        => Thêm video track, play video & kết thúc
        */
        localTracks.push(await AgoraRTC.createCameraVideoTrack());
        localTracks[1].play(`peer-${localUid}`);
        await client.publish([localTracks[1]]);
        return;
    }

    console.log("localTracks[1].muted: " + localTracks[1].muted);

    if (localTracks[1].muted) {
        await localTracks[1].setMuted(false);
    } else {
        await localTracks[1].setMuted(true);
    }
}