window.addEventListener('load', () => {
    var radioButtons = document.querySelectorAll('input[type=radio][name=umbrella]')
    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener("change", function () {
            if (this.value == 'u1') {
                document.getElementById("u1").style.display = "flex";
                document.getElementById("u2").style.display = "none";
            } else {
                document.getElementById("u1").style.display = "none";
                document.getElementById("u2").style.display = "flex";
            }
        });
    });

    var umbrellaDiv = document.getElementsByClassName("umbrella-main")[0];
    var DownloadButton = document.getElementById("dw_bt");

    DownloadButton.addEventListener("click", () => {
        domtoimage.toPng(umbrellaDiv)
            .then((dataUrl) => {
                var link = document.createElement("a");
                link.download = "umbrella.png"
                link.href = dataUrl;
                link.click();
            })
            .catch(function (error) {
                console.error("Something went wrong !!!");
            });
    })
})