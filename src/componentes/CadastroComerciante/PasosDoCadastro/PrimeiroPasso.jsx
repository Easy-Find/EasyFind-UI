import React from "react";


const PrimeiroPasso = ({ formData, onNext, onFormChange })=>{

    const handleChange = (field, event) => {
        onFormChange(field, event.target.value);
        };
        console.log('Estado formData em PrimeiroPasso:', formData);
    return(
        <>
            <h3>Dados empresariais: <br /> <br /></h3>
            <form>
                <div className="mb-4">
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-600">
                    Nome:
                    </label>
                    <input
                    type="text"
                    id="nome"
                    value={formData.nome} onChange={(e)=>handleChange('nome',e)}
                    name="nome"
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Digite seu nome"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="cpf" className="block text-sm font-medium text-gray-600">
                    CPF:
                    </label>
                    <input
                    type="text"
                    id="cpf"
                    value={formData.cpf} onChange={(e)=>handleChange('cpf',e)}
                    name="cpf"
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Digite seu CPF"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="cnpj" className="block text-sm font-medium text-gray-600">
                    CNPJ:
                    </label>
                    <input
                    type="text"
                    id="cnpj"
                    value={formData.cnpj} onChange={(e)=>handleChange('cnpj',e)}
                    name="cnpj"
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Digite o CNPJ da empresa"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="razao" className="block text-sm font-medium text-gray-600">
                    Razão Social:
                    </label>
                    <input
                    type="text"
                    id="razao"
                    name="razao"
                    value={formData.razaoSocial} onChange={(e)=>handleChange('razaoSocial',e)}
                    className="mt-1 p-2 w-full border rounded-md"
                    placeholder="Digite a razão social da empresa!"
                    />
                </div>
                <div className="w-100 flex justify-end">
                    <button
                        type="submit"
                        className="w-100 text-sm px-4 py-2 h-full font-semibold rounded border border-orange-400  hover:bg-orange-principal hover:text-white-principal transition-all undefined"
                        onClick={onNext}
                    >   
                        Próximo
                    </button>
                
                </div>
            
            </form>
        </>
    )
}
export default PrimeiroPasso;