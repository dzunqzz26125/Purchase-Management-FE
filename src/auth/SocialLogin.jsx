const SocialLogin = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button className="h-[52px] border rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container transition">
        <span>🔵</span> Google
      </button>

      <button className="h-[52px] border rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container transition">
        <span>🟦</span> Microsoft
      </button>
    </div>
  );
};

export default SocialLogin;
