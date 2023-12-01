function thietLapKhiDongCuaSoGoiDien() {
    window.onbeforeunload = function () {
        KetThucCuocGoi();
    }
    
}

function KetThucCuocGoi() {
    // Hủy peer dùng để gọi của GroupCall
    peer.destroy()
    // Gửi thông báo tới cửa sổ mẹ rằng cửa sổ con đã bị đóng
    window.opener.postMessage('childWindowCancle', '*');
}