import Button from "@componentes/Button/Button";

const CardMapa = ({ produto, ...props }) => {
  return (
    <div className="w-[230px]  gap-20 p-4 border-2 rounded-md bg-white-principal flex-start flex-colrounded-md">
      <div className="w-full  flex gap-y-6 flex-col   ">
        <div className="w-full h-[200px] bg-black-800 rounded object-cover">
          <img src={produto?.imagens[0]} alt="" className="w-full h-full" />
        </div>
        <div className="w-full text-xl  flex flex-col h-full gap-y-4 ">
          <div>
            <h2 className="font-semibold">{produto.nome}</h2>
            <h3 className="text-sm">{produto.categoria}</h3>
          </div>
          <Button {...props}>Ver mais informações</Button>
        </div>
      </div>
    </div>
  );
};

export default CardMapa;
