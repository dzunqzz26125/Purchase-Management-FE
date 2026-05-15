const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white flex justify-around py-xs">
      <span className="material-symbols-outlined">dashboard</span>
      <span className="material-symbols-outlined">inventory_2</span>
      <span className="material-symbols-outlined">add</span>
      <span className="material-symbols-outlined">swap_horiz</span>
      <span className="material-symbols-outlined">settings</span>
    </nav>
  );
};

export default BottomNav;
