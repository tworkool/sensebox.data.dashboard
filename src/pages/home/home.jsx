import { Link } from "react-router-dom";
import "./home.scss";
import { Badge, Button, Center, Container, Flex, Image, Text, Title } from "@mantine/core";
import GermanyMap from "@assets/content/germanymap.png";
import Header from "@components/static/header/header";
import Footer from "@components/static/footer/footer";

const nonFunctionalAttributes = [
  {
    title: "EU-based",
    description: "Developed and hosted in the EU for maximum data conformity and privacy (read more). Currently more focused on EU open data."
  },
  {
    title: "Open Source",
    description: "Public implementation to attract communal contributions (see GitHub.com)"
  },
  {
    title: "Free... Because Cost Efficient",
    description: "Based around the concept to make everything as cost efficient as possible: open data API's with little or no fees and server-less data storage using local storage or later-on third party backend options (see future plans)."
  },
  {
    title: "Powerful",
    description: "Built to contextualize all data in different forms like graphs, info blocks, follow-up actions and indicators."
  },
  {
    title: "Customizable and Interactive",
    description: "Adjust the UI to your needs by changing color and adapting behaviour and views."
  }
];

const functionalAttributes = [
  {
    title: "Live Statistics",
    description: "Developed and hosted in the EU for maximum data conformity and privacy (read more). Currently more focused on EU open data."
  },
  {
    title: "SenseBox Information",
    description: "Pin and search a SenseBox manually or in your area to get closeby environment information. Display your personal SenseBox first!"
  },
  {
    title: "Conversion System",
    description: "In order to better understand your data, there is an underlying conversion system for interactive conversions and data evaluation."
  },
  {
    title: "Analytics",
    description: "Developed and hosted in the EU for maximum data conformity and privacy (read more). Currently more focused on EU open data.",
    soon: true,
  },
  {
    title: "3D GIS",
    description: "Developed and hosted in the EU for maximum data conformity and privacy (read more). Currently more focused on EU open data.",
    soon: true,
  },
  {
    title: "Annotations",
    description: "Mix in your own context by annotating data.",
    soon: true,
  },
];

const Attribute = ({ title, description, soon }) => (
  <div className="homepage__attribute">
    <Flex align="center" justify="center">
      <Text ff="Satoshi-Bold">
        {title}
      </Text>
      {soon && <Badge color="red" ml="xs" size="xs" variant="light">soon</Badge>}
    </Flex>
    <Text>{description}</Text>
  </div>
);

const Home = (props) => {
  return (
    <>
      <Header />
      <main className='page-container homepage'>
        <div className="homepage__first">
          <Image className="homepage__bg" src={GermanyMap} alt="placeholder" />
          <div className="homepage__overlay"></div>
          <Center h="100%">
            <div className="page-content">
              <Text lh={1} ff="Satoshi-Black" size="5rem" style={{wordSpacing: 9999}}>
                Open 
                Source 
                Data 
                Visualization
              </Text>
              <Text ff="Satoshi-Light" lh={1.25} size="2rem" w={500} mt="md">
                The citizen science dashboard combining interdisciplinary open data to create something meaningful 
              </Text>
              <Button component={Link} to="/dashboard" size="lg" color="black" mt="lg" radius="xl">Explore</Button>
            </div>
          </Center>
        </div>
        <Container className="homepage__attributes" mt="lg">
          {nonFunctionalAttributes.map((attribute, index) => (
            <div key={index} className="homepage__attribute">
              <Text ff="Satoshi-Bold" mb="xs">{attribute.title}</Text>
              <Text>{attribute.description}</Text>
            </div>
          ))}
        </Container>
        <Container className="homepage__attributes" mt="lg">
          {functionalAttributes.map((attribute, index) => (
            <Attribute key={index} className="homepage__attribute" {...attribute} />
          ))}
        </Container>
        <Title order={2}>Announcements</Title>
        <Text>
          After a long break, I decided to keep this project alive by overhauling the whole codebase.
          The old code was just not fun to work on anymore and there were many logically and technologically outdated and personally unfavorable concepts.
          Such concepts being: slow bundler, messy redux setup for state management, outdated design system and styling and much more.
          <br />
          With version 1.0.0, many of these things have been done right from the beginning, which makes it much easier to work with and develop further.
          I took a step back and re-evaluated the whole project and its goals.
          I thought to myself: "who will likely use this project?" and came to the conclusion that I want to broaden the target audience.
          In the future, this is going to be a platform for open environmental data aggregation and visualization with the main focus currently on SenseBoxes!
          This is an exciting future in my opinion and I am looking forward to the next steps.
          <br />
          If you want to contribute to this project, please feel free to do so! I am looking forward to your pull requests and issues on GitHub.
          And if you want to support me, please consider donating via the link in the footer.
          I am also open to ideas and suggestions for the future of this project, so please feel free to reach out to me via the contact form in the footer.
          <br />
        </Text>
      </main>
      <Footer />
    </>
  );
};

export default Home;
