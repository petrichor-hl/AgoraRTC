function abc() {
    console.log("finishCall")
}

function finishCall() {
    console.log("finishCall")
    window.opener.postMessage('childWindowCancle', '*');
}
