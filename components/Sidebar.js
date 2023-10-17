const Sidebar = () => {
  return (
    <section id="sidebar" className="sidebar isHidden">
      <h3>Not active</h3>
      <nav>
        <ul className="categories-list">
          <li>Today</li>
          <li>This Week</li>
          <li>Missed</li>
          <li>
            Projects:
            <ul className="projects-list">
              <li>School</li>
              <li>Home</li>
              <li>Sports team</li>
              <li>Health</li>
            </ul>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;
