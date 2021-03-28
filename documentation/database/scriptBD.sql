DROP TABLE IF EXISTS `FestivalDuJeu`.`Facture`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`JeuExpose`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`Contact`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`Jeu`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`SuiviExposant`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`StatusExposant`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`TypeJeu`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`Zone`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`ReservationEspace`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`Reservation`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`Participant`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`Espace`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`Festival`;
DROP TABLE IF EXISTS `FestivalDuJeu`.`TypeEspace`;




/* TYPEJEU */
CREATE TABLE `FestivalDuJeu`.`TypeJeu` (
  `idTypeJeu` INT NOT NULL AUTO_INCREMENT,
  `nomType` VARCHAR(45),
  PRIMARY KEY (`idTypeJeu`));


/* PARTICIPANT */
CREATE TABLE `FestivalDuJeu`.`Participant` (
  `idParticipant` INT NOT NULL AUTO_INCREMENT,
  `nomParticipant` VARCHAR(45),
  `editeurSeulement` TINYINT(1),
  PRIMARY KEY (`idParticipant`));


/* JEU */
CREATE TABLE `FestivalDuJeu`.`Jeu` (
  `idJeu` INT NOT NULL AUTO_INCREMENT,
  `nomJeu` VARCHAR(45),
  `nbJoueurMin` INT,
  `nbJoueurMax` INT,
  `age` INT,
  `duree` INT,
  `consigne` VARCHAR(1000),
  `prototype` TINYINT(1),
  `type` INT NOT NULL,
  `editeur` INT NOT NULL,
   INDEX `type_idx` (`type` ASC) VISIBLE,
   INDEX `editeur_idx` (`editeur` ASC) VISIBLE, 
  PRIMARY KEY (`idJeu`),
  CONSTRAINT `type`
    FOREIGN KEY (`type`)
    REFERENCES `FestivalDuJeu`.`TypeJeu` (`idTypeJeu`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `editeur`
    FOREIGN KEY (`editeur`)
    REFERENCES `FestivalDuJeu`.`Participant` (`idParticipant`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

/* CONTACT */
CREATE TABLE `FestivalDuJeu`.`Contact` (
  `idContact` INT NOT NULL AUTO_INCREMENT,
  `nomContact` VARCHAR(45),
  `prenomContact` VARCHAR(45),
  `emailContact` VARCHAR(100),
  `rue` VARCHAR(100),
  `cp` VARCHAR(100),
  `ville` VARCHAR(100),
  `pays` VARCHAR(100),
  `telContact` VARCHAR(20),
  `telBureau` VARCHAR(20),
  `fonctionContact` VARCHAR(100),
  `estPrincipal` TINYINT(1),
  `participant` INT,
  PRIMARY KEY (`idContact`),
  INDEX `participant_idx` (`participant` ASC) VISIBLE, 
  CONSTRAINT `participant`
    FOREIGN KEY (`participant`)
    REFERENCES `FestivalDuJeu`.`Participant` (`idParticipant`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


/* FESTIVAL */
CREATE TABLE `FestivalDuJeu`.`Festival` (
  `idFestival` INT NOT NULL AUTO_INCREMENT,
  `nomFestival` VARCHAR(100),
  `dateFestival` DATE,
  `estCourant` TINYINT(1),
  PRIMARY KEY (`idFestival`));


/* TYPE ESPACE */
CREATE TABLE `FestivalDuJeu`.`TypeEspace` (
  `idTypeEspace` INT NOT NULL AUTO_INCREMENT,
  `nomEspace` VARCHAR(100),
  PRIMARY KEY (`idTypeEspace`));


/* ESPACE */
CREATE TABLE `FestivalDuJeu`.`Espace` (
  `idEspace` INT NOT NULL AUTO_INCREMENT,
  `nbTableMAx` INT,
  `prixUnitaireTable` FLOAT,
  `prixM2` FLOAT,
  `festivalE` INT NOT NULL,
  `typeEspace` INT NOT NULL,
  PRIMARY KEY (`idEspace`),
  INDEX `typeEspace_idx` (`typeEspace` ASC) VISIBLE, 
  INDEX `festival_idx` (`festivalE` ASC) VISIBLE,
  CONSTRAINT `typeEspace`
    FOREIGN KEY (`typeEspace`)
    REFERENCES `FestivalDuJeu`.`TypeEspace` (`idTypeEspace`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `festivalE`
    FOREIGN KEY (`festivalE`)
    REFERENCES `FestivalDuJeu`.`Festival` (`idFestival`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

/* RESERVATION */
CREATE TABLE `FestivalDuJeu`.`Reservation` (
  `idReservation` INT NOT NULL AUTO_INCREMENT,
  `dateReservation` DATETIME,
  `prix` FLOAT,
  `remise` FLOAT,
  `factureEnvoye` TINYINT(1),
  `festival` INT NOT NULL,
  `participantReservation` INT NOT NULL,
  PRIMARY KEY (`idReservation`),
  INDEX `festival_idx` (`festival` ASC) VISIBLE, 
  INDEX `participant_idx` (`participantReservation` ASC) VISIBLE, 
  CONSTRAINT `festival`
    FOREIGN KEY (`festival`)
    REFERENCES `FestivalDuJeu`.`Festival` (`idFestival`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `participantReservation`
    FOREIGN KEY (`participantReservation`)
    REFERENCES `FestivalDuJeu`.`Participant` (`idParticipant`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


/* FACTURE */
CREATE TABLE `FestivalDuJeu`.`Facture` (
  `idFacture` INT NOT NULL AUTO_INCREMENT,
  `dateEmissionFacture` DATETIME NOT NULL,
  `datePaiementFacture` DATETIME NOT NULL,
  `reservation` INT NOT NULL,
  PRIMARY KEY (`idFacture`),
  INDEX `reservation_idx` (`reservation` ASC) VISIBLE, 
  CONSTRAINT `reservation`
    FOREIGN KEY (`reservation`)
    REFERENCES `FestivalDuJeu`.`Reservation` (`idReservation`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);



/* RESERVATIONESPACE */
CREATE TABLE `FestivalDuJeu`.`ReservationEspace` (
  `idEspace` INT NOT NULL,
  `idReservation` INT NOT NULL,
  `nbTable` INT,
  `nbM2` INT,
  PRIMARY KEY (`idEspace`, `idReservation`),
  INDEX `idEspace_idx` (`idEspace` ASC) VISIBLE, 
  INDEX `idReservation_idx` (`idReservation` ASC) VISIBLE, 
  CONSTRAINT `idEspace`
    FOREIGN KEY (`idEspace`)
    REFERENCES `FestivalDuJeu`.`Espace` (`idEspace`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `idReservation`
    FOREIGN KEY (`idReservation`)
    REFERENCES `FestivalDuJeu`.`Reservation` (`idReservation`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


/* ZONE */
CREATE TABLE `FestivalDuJeu`.`Zone` (
  `idZone` INT NOT NULL AUTO_INCREMENT,
  `nomZone` VARCHAR(100),
  PRIMARY KEY (`idZone`));


/* JEUEXPOSE */
CREATE TABLE `FestivalDuJeu`.`JeuExpose` (
  `idReservation` INT NOT NULL,
  `idJeu` INT NOT NULL,
  `quantiteExpose` INT,
  `quantiteDonation` INT,
  `quantiteTombola` INT,
  `estAmene` TINYINT(1),
  `estRecu` TINYINT(1),
  `estARenvoye` TINYINT(1),
  `aEteRenvoye` TINYINT(1),
  `estPlace` TINYINT(1),
  `zone` INT NOT NULL,
  PRIMARY KEY (`idReservation`, `idJeu`),
  INDEX `idReservation_idx` (`idReservation` ASC) VISIBLE, 
  INDEX `idJeu_idx` (`idJeu` ASC) VISIBLE, 
  INDEX `zone_idx` (`zone` ASC) VISIBLE, 
  CONSTRAINT `idReservationR`
    FOREIGN KEY (`idReservation`)
    REFERENCES `FestivalDuJeu`.`Reservation` (`idReservation`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `idJeuJ`
    FOREIGN KEY (`idJeu`)
    REFERENCES `FestivalDuJeu`.`Jeu` (`idJeu`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `zone`
    FOREIGN KEY (`zone`)
    REFERENCES `FestivalDuJeu`.`Zone` (`idZone`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


/* STATUSEXPOSANT */
CREATE TABLE `FestivalDuJeu`.`StatusExposant` (
  `idStatusExposant` INT NOT NULL AUTO_INCREMENT,
  `nomStatus` VARCHAR(100),
  PRIMARY KEY (`idStatusExposant`));

/* SUIVISEXPOSANT */
CREATE TABLE `FestivalDuJeu`.`SuiviExposant` (
  `idFestival` INT NOT NULL,
  `idParticipant` INT NOT NULL,
  `commentaires` VARCHAR(500),
  `jeuxRentres` TINYINT(1),
  `besoinBenevol` TINYINT(1),
  `premierContact` DATE,
  `secondContact` DATE,
  `troisiemeContact` DATE,
  `place` TINYINT(1),
  `status` INT NOT NULL,
  PRIMARY KEY (`idFestival`, `idParticipant`),
  INDEX `idFestival_idx` (`idFestival` ASC) VISIBLE,
  INDEX `idParticipant_idx` (`idParticipant` ASC) VISIBLE,
  INDEX `status_idx` (`status` ASC) VISIBLE,
  CONSTRAINT `idFestival`
    FOREIGN KEY (`idFestival`)
    REFERENCES `FestivalDuJeu`.`Festival` (`idFestival`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `idParticipant`
    FOREIGN KEY (`idParticipant`)
    REFERENCES `FestivalDuJeu`.`Participant` (`idParticipant`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `status`
    FOREIGN KEY (`status`)
    REFERENCES `FestivalDuJeu`.`StatusExposant` (`idStatusExposant`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);