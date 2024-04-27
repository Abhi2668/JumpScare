document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video');

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream;

                video.onloadedmetadata = function() {
                    setTimeout(() => {
                        const canvas = document.createElement('canvas');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                        const imageURL = canvas.toDataURL('image/png');
                        const now = new Date();
                        const date = now.toISOString().split('T')[0];
                        const time = now.toTimeString().split(' ')[0].replace(/:/g, '-'); 

                        chrome.downloads.download({
                            url: imageURL,
                            filename: `Jumpscares/${date} and ${time}.png`
                        });

                        stream.getTracks().forEach(track => track.stop());
                        video.remove();
                        window.close();
                    }, 1000);
                };
            })
            .catch(function(error) {
                console.error('Error accessing the webcam', error);
            });
    }
});
