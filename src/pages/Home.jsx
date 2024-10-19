import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import LoadingPage from "./LoadingPage";

function Home() {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      {navigation.state == "loading" ? <LoadingPage /> : <Outlet />}
    </>
  );
}

export default Home;
