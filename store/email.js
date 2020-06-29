import { Map as immutableMap } from 'immutable';
import { getField, updateField } from 'vuex-map-fields';
import { debounce } from 'throttle-debounce';
import ky from 'ky';

const HOST = `https://cors-prx.idz.workers.dev?https://api.mailgun.net/v3/emails.id0.it`;

const mailgun = ky.extend({
  hooks: {
    beforeRequest: [
      async request => {
        // request.headers.set('Authorization', 'Bearer ' + token);
        request.headers.set('Authorization', 'Basic ' + btoa('api:key-a7bcc0ef3a83ad3015401c5c2bf6684d'));
      },
    ],
  },
});

const STATE = immutableMap({
  date: Date.now(),
  show: false,
});

export const state = () => STATE.toJS();

export const getters = {
  getField,
};

export const mutations = {
  updateField,
  clean(state) {
    Object.assign(state, {
      ...STATE.toJS(),
      date: Date.now(),
    });
  },
};

export const actions = {
  send: debounce(100, async (context, payload) => {
    const data = {
      from: process.env.NUXT_ENV_EMAIL_FROM,
      to: payload.to,
      subject: payload.subject || 'No subject',
      text: payload.text || 'No text',
      html: payload.text || 'No text',
    };

    const formData  = new FormData();

    for(const name in data) {
      formData.append(name, data[name]);
    }

    try {
      const r = await mailgun
        .post(`${HOST}/messages`, {
          body: formData,
          // json,
          credentials: 'omit',
        })
        .json();
      console.log('mailgun API - response:', r);

      // let info = await transporter.sendMail(email);
    } catch (error) {
      console.log('mailgun API - error:', error);
    }
  }),
};
