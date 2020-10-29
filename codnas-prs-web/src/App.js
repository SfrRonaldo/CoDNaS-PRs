import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeaderLinks from "./components/Header/HeaderLinks";
import Detail from "./routes/Detail";
import Estimacion from "./routes/Estimacion";
import Home from "./routes/Home/index";
import Tutorial from "./routes/Tutorial";

const App = () => (
  <Router>
    <div>
      <Header
        brand="PROTEÍNAS REPETIDAS"
        rightLinks={<HeaderLinks />}
        fixed
        color="primary"
        changeColorOnScroll={{ height: 400, color: "dark" }}
      />
      <main>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/tutorial" component={Tutorial} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/estimacion/:id" component={Estimacion} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;
