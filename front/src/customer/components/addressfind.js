import React from 'react';
import DaumPostcode from 'react-daum-postcode';

export default function Postcode(){
    const [values, setValues] = React.useState({
        address:'',
        zonecode:'',
    });

    const handleAddress = data => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        let zoneAddress = data.zonecode;
        if (data.addressType === 'R') {
        if (data.bname !== '') {
            extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setValues({address : fullAddress, zonecode: zoneAddress})
        console.log(fullAddress + zoneAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    }
    
    return (
        <DaumPostcode
        onComplete={handleAddress}
        autoClose={true}
        />
    );
}