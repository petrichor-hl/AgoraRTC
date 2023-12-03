function tatNhacChuong() {
    window.opener.postMessage('tatNhacChuong', '*');
}

function thietLapKhiDongCuocGoi() {
    console.log("thietLapKhiDongCuocGoi()");
    onbeforeunload = function () {
        console.log("finishCall");
        finishCall();
    }
}

function finishCall() {
    console.log("finishCall");
    window.opener.postMessage('childWindowCancle', '*');
}
