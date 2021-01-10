import axios from 'axios';
import url from '@/service/url-config.js';

const appKey = 'zzydy_zkjz-463Q9GDs80KF4qYfuum';
const appSecret = '5ka6J1e74crq83BbQ9uo785FST99H0k1Dnw06Qtx';

export const setAuth = function() {
  gettoken();
}

function gettoken() {
  alert('000000000000')
  axios.post(url.getJsapiToken, {}).then(res => {
    alert(JSON.stringify(res))
    if(res.success) {
      let accessToken = res.data;
      alert(accessToken)
      console.log(accessToken, '000')
    }
  }).catch(res => {
    alert(JSON.stringify(res))
  })
}