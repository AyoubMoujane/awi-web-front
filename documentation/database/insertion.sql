/* ESPACE */
INSERT INTO `Espace` (`idEspace`,`nbTableMAx`, `prixUnitaireTable`, `prixM2`, `typeEspace`) VALUES
(NULL, '60', '100', '', '1'),
(NULL, '121', '95', '', '2'),
(NULL, '0', '90', '', '3');

/* FESTIVAL */
INSERT INTO `Festival` (`idFestival`,`nomFestival`, `dateFestival`, `estCourant`) VALUES
(NULL, 'Foire expo', '2021-06-12', '0'),
(NULL, 'Foire 2020', '2020-07-23', '0');

/* PARTICIPANTS */
INSERT INTO `Participant` (`idParticipant`,`nomParticipant`, `editeurSeulement`) VALUES
(NULL, 'Ankama', ''),
(NULL, 'Asmodee', '1'),
(NULL, 'Bombyx', ''),
(NULL, 'Delicious games', ''),
(NULL, 'Gigamic', '1'),
(NULL, 'Haba', ''),
(NULL, 'Hurrican Edition', ''),
(NULL, 'Igiari', ''),
(NULL, 'Kosmos', ''),
(NULL, 'Old Casa Games', '');

/* ESPACE */
INSERT INTO `Espace` (`idEspace`,`nbTableMAx`, `prixUnitaireTable`, `prixM2`, `typeEspace`) VALUES
(NULL, '60', '100', '', '1'),
(NULL, '121', '95', '', '2'),
(NULL, '0', '90', '', '3');

/* PARTICIPANTS */
INSERT INTO `Participant` (`idParticipant`,`nomParticipant`, `editeurSeulement`) VALUES
(NULL, 'Ankama', ''),
(NULL, 'Asmodee', '1'),
(NULL, 'Bombyx', ''),
(NULL, 'Delicious games', ''),
(NULL, 'Gigamic', '1'),
(NULL, 'Haba', ''),
(NULL, 'Hurrican Edition', ''),
(NULL, 'Igiari', ''),
(NULL, 'Kosmos', ''),
(NULL, 'Old Casa Games', '');

/* ZONES */
INSERT INTO `Zone` (`idZone`,`nomZone`,`festivalFK`) VALUES
(NULL, 'Allée centrale',1),
(NULL, 'Zone A',1),
(NULL, 'Zone B',1),
(NULL, 'Zone C',2);