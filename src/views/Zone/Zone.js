import * as React from 'react';
import ZoneForm from '../../components/Zone/ZoneForm';
import ZoneDetail from '../../components/Zone/ZoneDetail';
import ZoneList from '../../components/Zone/ZoneList';




export default function Zone() {
  return (
    <div>
      <ZoneForm></ZoneForm>
      <ZoneDetail zone = {{idZone: 1, nomZone:"La zone en personne"}}/>
      <ZoneList/>

    </div>
  );
}
