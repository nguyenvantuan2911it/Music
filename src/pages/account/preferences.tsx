import * as React from 'react';
import AccountInfo from '.';

export interface PreferencesProps {}

export default function Preferences(props: PreferencesProps) {
  return (
    <AccountInfo>
      <div>We develop it next version</div>
      {/* <form>
        <div style={{ fontSize: '26px' }}>Select your preferred audio format</div>
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center' }}>
          <input
            name="prefernces"
            type="radio"
            id="wave"
            style={{ width: '24px', height: '24px', marginRight: '16px' }}
          />
          <label style={{ fontSize: '16px', cursor: 'pointer' }} htmlFor="wave">
            Wave file - 24 bit 48kHz (.wav)
          </label>
        </div>
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center' }}>
          <input
            name="prefernces"
            type="radio"
            id="Compressed"
            style={{ width: '24px', height: '24px', marginRight: '16px' }}
            defaultChecked
          />
          <label style={{ fontSize: '16px', cursor: 'pointer' }} htmlFor="Compressed">
            Compressed MP3 file - 320kbps 48kHz (.mp3)
          </label>
        </div>
        <button
          className="my-10"
          style={{
            backgroundColor: '#767676',
            marginTop: '20px',
            fontSize: '16px',
            float: 'right',
            width: '70px',
            height: '42px',
            color: 'black',
            fontWeight: 'bold',
          }}
        >
          Save
        </button> */}
      {/* </form> */}
    </AccountInfo>
  );
}
