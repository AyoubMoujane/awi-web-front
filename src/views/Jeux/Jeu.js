import * as React from 'react';
import JeuList from '../../components/Jeux/JeuList';
import JeuForm from '../../components/Jeux/JeuForm';
import JeuDetail from '../../components/Jeux/JeuDetail';





export default function Jeu() {
  return (
    <div>
      <JeuList></JeuList>
      <JeuForm></JeuForm>
      <JeuDetail></JeuDetail>
    </div>
  );
}
