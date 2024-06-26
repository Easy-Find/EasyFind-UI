import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormContext from "@/context/Form/FormContext";
import Button from "@componentes/Button/Button";
import RowDia from "./RowDia";

const Step3 = () => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const { setStorage, storage, currentStep, nextStep, prevStep } =
    useContext(FormContext);
  const submit = (data, callback) => {
    setStorage({ ...storage, ...data });
    callback?.();
  };

  const validarStep = () => {
    const campos = watch();
    return (
      Object.values(campos.diaSemana).find(
        (value) =>
          value.isOpen &&
          (value.horarioInicio.length > 0 || value.horarioFim.length > 0)
      ) !== undefined
    );
  };

  const next = () => {
    if (validarStep()) {
      handleSubmit((data) => {
        submit(data, nextStep);
      })();
    }
  };

  const prev = () => {
    handleSubmit((data) => {
      submit(data);
    })();
    prevStep();
  };
  const [isApplyDefault, setIsApplyDefault] = useState(false);

  useEffect(() => {
    if (!isApplyDefault && Object.keys(storage).length > 0) {
      if (storage?.diaSemana) {
        Object.entries(storage.diaSemana).forEach(([key, value]) => {
          setValue(`diaSemana.${key.toLowerCase()}.isOpen`, value.isOpen);
          setValue(
            `diaSemana.${key.toLowerCase()}.horarioInicio`,
            value.horarioInicio
          );
          setValue(
            `diaSemana.${key.toLowerCase()}.horarioFim`,
            value.horarioFim
          );
        });
        setIsApplyDefault(true);
      }
    }
    // eslint-disable-next-line
  }, [storage]);

  return (
    <form
      className={`relative mx-auto flex flex-col gap-y-8 ${
        currentStep() != 2 && "hidden"
      }`}
    >
      <div className="text-center">
        Informe no minimo um horário de funcionamento
      </div>
      <div className="grid grid-rows-[repeat(8,60px)]   h-[250px] overflow-y-scroll py-8 px-4">
        <div className=" grid grid-cols-[repeat(4,120px)] items-center  gap-x-4 absolute  py-2 top-10   z-10  bg-white-principal border-b">
          <span>Abre</span>
          <span>Dia</span>
          <span>Abertura</span>
          <span>Fechamento</span>
        </div>

        <RowDia dia="Domingo" register={register} watch={watch} />
        <RowDia dia="Segunda-Feira" register={register} watch={watch} />
        <RowDia dia="Terça-Feira" register={register} watch={watch} />
        <RowDia dia="Quarta-Feira" register={register} watch={watch} />
        <RowDia dia="Quinta-Feira" register={register} watch={watch} />
        <RowDia dia="Sexta-Feira" register={register} watch={watch} />
        <RowDia dia="Sábado" register={register} watch={watch} />
        <RowDia dia="Feriado" register={register} watch={watch} />
      </div>
      <div className="flex justify-center w-2/4 mx-auto gap-x-3">
        <Button type="button" onClick={prev}>
          Retroceder
        </Button>
        <Button type="button" onClick={next}>
          Avançar
        </Button>
      </div>
    </form>
  );
};

export default Step3;
