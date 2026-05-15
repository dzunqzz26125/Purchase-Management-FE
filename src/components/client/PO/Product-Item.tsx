const ProItem = () => {
  return (
    <div className="grid grid-cols-12 gap-sm p-sm bg-surface-bright rounded-xl">
      <div className="col-span-6">
        <p className="font-semibold">Tai nghe X1</p>
        <p className="text-xs text-secondary">SKU: HW-001</p>
      </div>

      <div className="col-span-3">
        <input
          type="number"
          className="soft-input w-full text-center"
          defaultValue={100}
        />
      </div>

      <div className="col-span-3 text-right">
        <button className="text-red-500">X</button>
      </div>
    </div>
  );
};

export default ProItem;
