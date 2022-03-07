import Layout from '../components/Layout';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import Service from '../components/Service';
import About from '../components/About';
import Footer from '../components/Footer';
import { CanvasClient } from '@uniformdev/canvas';
import { Composition, Slot } from '@uniformdev/canvas-react';


const resolveRenderer = (component) => {
  // choose the component based on the Canvas component type
  // (you can also use a Map, switch, next/dynamic, etc here)
  if (component.type === 'hero') {
    return Hero;
  }

  return null;
};

const Index = ({ composition }) => {
  return (
    <Layout pageTitle='Landing Page Nextjs'>
      <Header />
      {/* <Hero /> */}
      {/* <Feature />
      <Service />
      <About />
      <Footer /> */}
      <Composition data={composition} resolveRenderer={resolveRenderer}>
        <Slot name='content' />
      </Composition>

      {/* <pre>{JSON.stringify(composition, null, 2)}</pre> */}
    </Layout>
  );
};

export async function getStaticProps() {
  const client = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });

  // fetch the composition from Canvas
  const { composition } = await client.getCompositionById({
    // if you used something else as your slug, use that here instead
    compositionId: 'f70d7a93-0be0-446f-a3f3-5cbc4e610e7b',
    // state:CANVAS_DRAFT_STATE,
  });

  // set `composition` as a prop to the route
  return {
    props: {
      composition,
    },
  };
}

export default Index;
