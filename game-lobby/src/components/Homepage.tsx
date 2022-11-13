import { Link } from "react-router-dom";
 
function Homepage() {
  return (
    <div>
      <h1>Welcome to the Game Lobby</h1>
      <Link to="/gamelobby">Click here to go to the Game Lobby</Link>
    </div>
  );
}
 
export default Homepage;