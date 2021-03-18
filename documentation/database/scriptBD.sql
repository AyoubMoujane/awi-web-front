DROP TABLE IF EXISTS `FestivalDuJeu`.`Facture`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`JeuExpose`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`StatusExposant`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`Contact`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`Jeu`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`SuiviExposant`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`TypeJeu`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`Zone`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`ReservationEspace`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`Reservation`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`Participant`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`Festival`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`Espace`;



/* TYPEJEU */
CREATE TABLE `FestivalDuJeu`.`TypeJeu` (
  `idTypeJeu` INT NOT NULL AUTO_INCREMENT,
  `nomType` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTypeJeu`));


/* PARTICIPANT */
CREATE TABLE `FestivalDuJeu`.`Participant` (
  `idParticipant` INT NOT NULL AUTO_INCREMENT,
  `nomParticipant` VARCHAR(45) NOT NULL,
  `prenomParticipant` VARCHAR(45) NOT NULL,
  `editeurSeulement` TINYINT(1) NOT NULL,
  PRIMARY KEY (`idParticipant`));


/* JEU */
CREATE TABLE `FestivalDuJeu`.`Jeu` (
  `idJeu` INT NOT NULL AUTO_INCREMENT,
  `nomJeu` VARCHAR(45) NOT NULL,
  `nbJoueurMin` INT NOT NULL,
  `nbJoueurMax` INT NOT NULL,
  `age` INT NOT NULL,
  `duree` FLOAT NOT NULL,
  `consigne` VARCHAR(1000) NOT NULL,
  `prototype` TINYINT(1) NOT NULL,
  `type` INT NOT NULL,
  `editeur` INT NOT NULL,
   INDEX `type_idx` (`type` ASC) VISIBLE,
   INDEX `editeur_idx` (`editeur` ASC) VISIBLE, 
  PRIMARY KEY (`idJeu`),
  CONSTRAINT `type`
    FOREIGN KEY (`type`)
    REFERENCES `FestivalDuJeu`.`TypeJeu` (`idTypeJeu`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `editeur`
    FOREIGN KEY (`editeur`)
    REFERENCES `FestivalDuJeu`.`Participant` (`idParticipant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

/* CONTACT */
CREATE TABLE `FestivalDuJeu`.`Contact` (
  `idContact` INT NOT NULL AUTO_INCREMENT,
  `nomContact` VARCHAR(45) NOT NULL,
  `prenomContact` VARCHAR(45) NOT NULL,
  `emailContact` VARCHAR(100) NOT NULL,
  `rue` VARCHAR(100) NOT NULL,
  `cp` VARCHAR(100) NOT NULL,
  `ville` VARCHAR(100) NOT NULL,
  `pays` VARCHAR(100) NOT NULL,
  `telContact` VARCHAR(20) NOT NULL,
  `telBureau` VARCHAR(20) NOT NULL,
  `fonctionContact` VARCHAR(100) NOT NULL,
  `estPrincipal` TINYINT(1) NOT NULL,
  `participant` INT NOT NULL,
  `adresse` INT NOT NULL,
  PRIMARY KEY (`idContact`),
  INDEX `participant_idx` (`participant` ASC) VISIBLE, 
  CONSTRAINT `participant`
    FOREIGN KEY (`participant`)
    REFERENCES `FestivalDuJeu`.`Participant` (`idParticipant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


/* TYPE ESPACE */
CREATE TABLE `FestivalDuJeu`.`TypeEspace` (
  `idTypeEspace` INT NOT NULL AUTO_INCREMENT,
  `nomEspace` INT NOT NULL,
  PRIMARY KEY (`idTypeEspace`));


/* ESPACE */
CREATE TABLE `FestivalDuJeu`.`Espace` (
  `idEspace` INT NOT NULL AUTO_INCREMENT,
  `nbTableMAx` INT NOT NULL,
  `prixUnitaireTable` FLOAT NOT NULL,
  `prixM2` FLOAT NOT NULL,
  `typeEspace` INT NOT NULL,

  PRIMARY KEY (`idEspace`));
  INDEX `typeEspace_idx` (`typeEspace` ASC) VISIBLE, 
  CONSTRAINT `espace`
    FOREIGN KEY (`espace`)
    REFERENCES `FestivalDuJeu`.`TypeEspace` (`idTypeEspace`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


/* FESTIVAL */
CREATE TABLE `FestivalDuJeu`.`Festival` (
  `idFestival` INT NOT NULL AUTO_INCREMENT,
  `nomFestival` VARCHAR(100) NOT NULL,
  `dateFestival` DATE NOT NULL,
  `espace` INT NOT NULL,
  `estCourant` TINYINT(1) NOT NULL,

  PRIMARY KEY (`idFestival`),
  INDEX `espace_idx` (`espace` ASC) VISIBLE, 
  CONSTRAINT `espace`
    FOREIGN KEY (`espace`)
    REFERENCES `FestivalDuJeu`.`Espace` (`idEspace`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


/* RESERVATION */
CREATE TABLE `FestivalDuJeu`.`Reservation` (
  `idReservation` INT NOT NULL AUTO_INCREMENT,
  `dateReservation` DATETIME NOT NULL,
  `prix` FLOAT NOT NULL,
  `remise` FLOAT NOT NULL,
  `factureEnvoye` TINYINT(1) NOT NULL,
  `facture` INT,
  `festival` INT NOT NULL,
  `participantReservation` INT NOT NULL,
  PRIMARY KEY (`idReservation`),
  INDEX `festival_idx` (`festival` ASC) VISIBLE, 
  INDEX `participant_idx` (`participantReservation` ASC) VISIBLE, 
  CONSTRAINT `festival`
    FOREIGN KEY (`festival`)
    REFERENCES `FestivalDuJeu`.`Festival` (`idFestival`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `participantReservation`
    FOREIGN KEY (`participantReservation`)
    REFERENCES `FestivalDuJeu`.`Participant` (`idParticipant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


/* FACTURE */
CREATE TABLE `FestivalDuJeu`.`Facture` (
  `idFacture` INT NOT NULL AUTO_INCREMENT,
  `dateEmissionFacture` DATETIME NOT NULL,
  `datePaiementFacture` DATETIME NOT NULL,
  `resarvation` INT NOT NULL,
  PRIMARY KEY (`idFacture`),
  INDEX `resarvation_idx` (`resarvation` ASC) VISIBLE, 
  CONSTRAINT `resarvation`
    FOREIGN KEY (`resarvation`)
    REFERENCES `FestivalDuJeu`.`Reservation` (`idReservation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



/* RESERVATIONESPACE */
CREATE TABLE `FestivalDuJeu`.`ReservationEspace` (
  `idEspace` INT NOT NULL,
  `idReservation` INT NOT NULL,
  `nbTable` INT NOT NULL,
  `nbM2` FLOAT NOT NULL,
  PRIMARY KEY (`idEspace`, `idReservation`),
  INDEX `idEspace_idx` (`idEspace` ASC) VISIBLE, 
  INDEX `idReservation_idx` (`idReservation` ASC) VISIBLE, 
  CONSTRAINT `idEspace`
    FOREIGN KEY (`idEspace`)
    REFERENCES `FestivalDuJeu`.`Espace` (`idEspace`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idReservation`
    FOREIGN KEY (`idReservation`)
    REFERENCES `FestivalDuJeu`.`Reservation` (`idReservation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


/* ZONE */
CREATE TABLE `FestivalDuJeu`.`Zone` (
  `idZone` INT NOT NULL AUTO_INCREMENT,
  `nomZone` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idZone`));


/* JEUEXPOSE */
CREATE TABLE `FestivalDuJeu`.`JeuExpose` (
  `idReservation` INT NOT NULL,
  `idJeu` INT NOT NULL,
  `quantiteExpose` INT NOT NULL,
  `quantiteDonation` INT NOT NULL,
  `quantiteTombola` INT NOT NULL,
  `estAmene` TINYINT(1) NOT NULL,
  `estRecu` TINYINT(1) NOT NULL,
  `estARenvoye` TINYINT(1) NOT NULL,
  `aEteRenvoye` TINYINT(1) NOT NULL,
  `estPlace` TINYINT(1) NOT NULL,
  `zone` INT NOT NULL,
  PRIMARY KEY (`idReservation`, `idJeu`),
  INDEX `idReservation_idx` (`idReservation` ASC) VISIBLE, 
  INDEX `idJeu_idx` (`idJeu` ASC) VISIBLE, 
  INDEX `zone_idx` (`zone` ASC) VISIBLE, 
  CONSTRAINT `idReservationR`
    FOREIGN KEY (`idReservation`)
    REFERENCES `FestivalDuJeu`.`Reservation` (`idReservation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idJeuJ`
    FOREIGN KEY (`idJeu`)
    REFERENCES `FestivalDuJeu`.`Jeu` (`idJeu`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `zone`
    FOREIGN KEY (`zone`)
    REFERENCES `FestivalDuJeu`.`Zone` (`idZone`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


/* STATUSEXPOSANT */
CREATE TABLE `FestivalDuJeu`.`StatusExposant` (
  `idStatusExposant` INT NOT NULL AUTO_INCREMENT,
  `nomStatus` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idStatusExposant`));

/* SUIVISEXPOSANT */
CREATE TABLE `FestivalDuJeu`.`SuiviExposant` (
  `idFestival` INT NOT NULL,
  `idParticipant` INT NOT NULL,
  `reponse` INT NOT NULL,
  `commentaires` VARCHAR(500) NOT NULL,
  `jeuxRentres` TINYINT(1) NOT NULL,
  `besoinBenevol` TINYINT(1) NOT NULL,
  `premierContact` DATETIME NOT NULL,
  `secondContact` DATETIME NOT NULL,
  `troisiemeContact` DATETIME NOT NULL,
  PRIMARY KEY (`idFestival`, `idParticipant`),
  INDEX `idFestival_idx` (`idFestival` ASC) VISIBLE,
  INDEX `idParticipant_idx` (`idParticipant` ASC) VISIBLE, 
  CONSTRAINT `idFestival`
    FOREIGN KEY (`idFestival`)
    REFERENCES `FestivalDuJeu`.`Festival` (`idFestival`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idParticipant`
    FOREIGN KEY (`idParticipant`)
    REFERENCES `FestivalDuJeu`.`Participant` (`idParticipant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

