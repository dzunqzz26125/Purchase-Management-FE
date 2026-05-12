export default function AuthIllustration() {
  return (
    <section className="hidden md:flex flex-col justify-between p-xl relative overflow-hidden bg-primary-container">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-fixed/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-xs mb-xl">
          <span className="material-symbols-outlined text-white text-[40px]">
            inventory_2
          </span>
          <h1 className="text-white text-h2 font-semibold">LogiFlow</h1>
        </div>

        <h2 className="text-white text-h1 mb-md">
          Nâng tầm quản trị <br />
          <span className="text-secondary-fixed">vận hành kho</span>
        </h2>
      </div>

      <img
        className="rounded-2xl opacity-90"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZtKiQ2G5jUk1SvYbAtXfY6VJVqQ2vzgHhV6jXU1D6VByc66BVCP1WatpBeMJz8maQcciEVN8jNXZpIBFS951VUJD9pWZvfKHxmGR3zOF3QwFKlC8lbb3zBpgVhcjyecP3GVM4qFL9w6eYiOu8LaHXxc2BS-Xjx3uf6mX7zvw5OcXr9xxTo-5DJzAKORHxYKJj1fvcMD3kEnspe_vS_PZtfoK3aivwo_gGVOAz6hDL5MC6WlqW6LwC8Ba_oGrN753cJv2RZqEh24I"
      />
    </section>
  );
}
