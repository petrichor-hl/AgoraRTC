function moCuaSoGoiDien(callerName, callerAvt, remoteId, receiverName, typeCall) {
    //const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    //const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    //const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    //const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    //const systemZoom = width / window.screen.availWidth;
    //const left = (width - 800) / 2 / systemZoom + dualScreenLeft
    //const top = (height - 500) / 2 / systemZoom + dualScreenTop
    //const newWindow = window.open(url, title,
    //    `
    //  scrollbars=yes,
    //  width=${800 / systemZoom},
    //  height=${500 / systemZoom},
    //  top=${top},
    //  left=${left}
    //  `
    //)

    //if (window.focus) newWindow.focus();

    const top = (screen.height - 800) / 2;
    const left = (screen.width - 500) / 2;

    // Cửa sổ con
    const roomId = myId + "." + remoteId;
    var urlToOpen = `http://localhost:5241//groupCall/${roomId}/${callerName}/${callerAvt}/${typeCall}/${receiverName}`;
    var childWindow = window.open(urlToOpen, "_blank", "left = " + left + ", top = " + top + ", width=800, height=500");

    // Đăng ký sự kiện nhận thông điệp từ cửa sổ con
    window.addEventListener('message', receiveMessageFromGroupCall, false);

    /* onbeforeunload event must be added after loading of pop-up window */
    //childWindow.onload = () => {
    //    childWindow.onbeforeunload = function () {
    //        console.log("call dongCuaSoGoiDien()")
    //    }
    //}
}

function receiveMessageFromGroupCall(event) {
    // Kiểm tra xem thông điệp có phải là từ cửa sổ con đóng hay không
    if (event.data === 'childWindowCancle') {

        console.log("Đã đóng cửa sổ con");
        console.log("Khởi tạo lại Peer để nhận cuộc gọi");
        // Tạo lại peer dùng để nhận thông báo cuộc gọi đến
        initPeer(true);
        thietLapLangNgheCuocGoi();

        // Gỡ Đăng ký sự kiện nhận thông điệp từ cửa sổ con
        window.removeEventListener('message', receiveMessageFromGroupCall, false);
    }
}

