function HomePage() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="container text-center m-3">
        <h1>Welcome to the <span className="text-white bg-danger fw-bold ps-1 rounded-start-2">MARVEL</span><span className="text-warning bg-danger fw-bold"> CHARACTER</span><span className="text-white bg-danger pe-1 rounded-end-2"> Manager</span> Website</h1>
        <h5>The place where you can view, add, update, and remove Marvel characters</h5>
        <p className="p-0 m-0"><small>Click on the Characters tab to view and update all characters</small></p>
        <p><small>Click on the Add Character tab to add a new character</small></p>
        <img src="https://upload.wikimedia.org/wikipedia/en/0/08/Secretwars1.png"></img>
      </div>
    </div>
  );
}
export default HomePage;
