import React from "react";
import Header from "../../components/header";
import "./style.scss";
import { Text, Title } from "@mantine/core";
import Footer from "../../components/footer";

const ImpressumPage = () => {
  return <div className="page__container">
    <Header/>    
    <div className="page__content">
      <Title order={1}>Impressum</Title>
      <Text>If you see any issues on this web application, please use my GitHub repository at <a href="https://github.com/tworkool/sensebox.data.dashboard/issues">https://github.com/tworkool/sensebox.data.dashboard/issues</a></Text>
      
      <Title order={2}>Haftungsausschluss &ndash; Disclaimer:</Title>
      
      <Title order={3}>Haftung f&uuml;r Inhalte</Title>
      <p>Alle Inhalte unseres Internetauftritts wurden mit gr&ouml;&szlig;ter Sorgfalt und nach bestem Gewissen erstellt. F&uuml;r die Richtigkeit, Vollst&auml;ndigkeit und Aktualit&auml;t der Inhalte k&ouml;nnen wir jedoch keine Gew&auml;hr &uuml;bernehmen. Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder gespeicherte fremde Informationen zu &uuml;berwachen oder nach Umst&auml;nden zu forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unber&uuml;hrt.</p>
      <p>Eine diesbez&uuml;gliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntniserlangung einer konkreten Rechtsverletzung m&ouml;glich. Bei Bekanntwerden von den o.g. Rechtsverletzungen werden wir diese Inhalte unverz&uuml;glich entfernen.</p>
      
      <Title order={3}>Haftungsbeschr&auml;nkung f&uuml;r externe Links</Title>
      <p>Unsere Webseite enth&auml;lt Links auf externe Webseiten Dritter. Auf die Inhalte dieser direkt oder indirekt verlinkten Webseiten haben wir keinen Einfluss. Daher k&ouml;nnen wir f&uuml;r die &#8222;externen Links&ldquo; auch keine Gew&auml;hr auf Richtigkeit der Inhalte &uuml;bernehmen. F&uuml;r die Inhalte der externen Links sind die jeweilige Anbieter oder Betreiber (Urheber) der Seiten verantwortlich.</p>
      <p>Die externen Links wurden zum Zeitpunkt der Linksetzung auf eventuelle Rechtsverst&ouml;&szlig;e &uuml;berpr&uuml;ft und waren im Zeitpunkt der Linksetzung frei von rechtswidrigen Inhalten. Eine st&auml;ndige inhaltliche &Uuml;berpr&uuml;fung der externen Links ist ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht m&ouml;glich. Bei direkten oder indirekten Verlinkungen auf die Webseiten Dritter, die au&szlig;erhalb unseres Verantwortungsbereichs liegen, w&uuml;rde eine Haftungsverpflichtung ausschlie&szlig;lich in dem Fall nur bestehen, wenn wir von den Inhalten Kenntnis erlangen und es uns technisch m&ouml;glich und zumutbar w&auml;re, die Nutzung im Falle rechtswidriger Inhalte zu verhindern.</p>
      <p>Diese Haftungsausschlusserkl&auml;rung gilt auch innerhalb des eigenen Internetauftrittes &#8222;Name Ihrer Domain&ldquo; gesetzten Links und Verweise von Fragestellern, Blogeintr&auml;gern, G&auml;sten des Diskussionsforums. F&uuml;r illegale, fehlerhafte oder unvollst&auml;ndige Inhalte und insbesondere f&uuml;r Sch&auml;den, die aus der Nutzung oder Nichtnutzung solcherart dargestellten Informationen entstehen, haftet allein der Diensteanbieter der Seite, auf welche verwiesen wurde, nicht derjenige, der &uuml;ber Links auf die jeweilige Ver&ouml;ffentlichung lediglich verweist.</p>
      <p>Werden uns Rechtsverletzungen bekannt, werden die externen Links durch uns unverz&uuml;glich entfernt.</p>
      
      <Title order={3}>Urheberrecht</Title>
      <p>Die auf unserer Webseite ver&ouml;ffentlichen Inhalte und Werke unterliegen dem deutschen Urheberrecht (<a href="http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf">http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf</a>) . Die Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung des geistigen Eigentums in ideeller und materieller Sicht des Urhebers au&szlig;erhalb der Grenzen des Urheberrechtes bed&uuml;rfen der vorherigen schriftlichen Zustimmung des jeweiligen Urhebers i.S.d. Urhebergesetzes (<a href="http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf">http://www.gesetze-im-internet.de/bundesrecht/urhg/gesamt.pdf</a>). Downloads und Kopien dieser Seite sind nur f&uuml;r den privaten und nicht kommerziellen Gebrauch erlaubt. Sind die Inhalte auf unserer Webseite nicht von uns erstellt wurden, sind die Urheberrechte Dritter zu beachten. Die Inhalte Dritter werden als solche kenntlich gemacht. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte unverz&uuml;glich entfernen.</p>
      <p>Dieses Impressum wurde freundlicherweise von <a href="https://jurarat.de/">jurarat.de</a> zur Verf&uuml;gung gestellt.</p>
    </div>
    <Footer/>
  </div>;
};

export default ImpressumPage;
