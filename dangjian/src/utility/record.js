export const startRecord = function () {
  dd.startRecordAudio().then(() => {
    //⽀持最⻓为300秒（包括）的⾳频录制，默认60秒(包括)。
      // alert('录音开始')
    }).catch(e => {
      alert(e)
  });
}

export const endRecord = () => {
  return new Promise((resolve, reject) => {
    dd.stopRecordAudio().then(result => {
      //⽀持最⻓为300秒（包括）的⾳频录制，默认60秒(包括)。
        resolve(result)
      }).catch(e => {
        reject(e);
    });
  })
}

export const downloadRecord = (mediaId) => {
  return new Promise((resolve, reject) => {
    dd.downloadAudio({ mediaId : mediaId }).then(result => {
      //⽀持最⻓为300秒（包括）的⾳频录制，默认60秒(包括)。
        resolve(result)
      }).catch(e => {
        reject(e);
    });
  })
}

export const playRecord = (localAudioId) => {
  return new Promise((resolve, reject) => {
    dd.playAudio({ localAudioId : localAudioId }).then(result => {
      //⽀持最⻓为300秒（包括）的⾳频录制，默认60秒(包括)。
        resolve(result)
      }).catch(e => {
        console.log(e, '播放失败')
        reject(e);
    });
  })
}

export const translateVoice = (mediaId) => {
  return new Promise((resolve, reject) => {
    dd.device.audio.translateVoice({
      mediaId : mediaId,
      duration : 5.0,
      onSuccess : function (res) {
        // res.mediaId; // 转换的语音的mediaId
        // res.content; // 语音转换的文字内容
        resolve(res)
      }
    });
  })
}
