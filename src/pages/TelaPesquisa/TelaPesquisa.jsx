import NavbarRoot from "../../componentes/Navbar/NavbarRoot";
import Switch from "../../componentes/Switch/BotaoSwitch";
import CardProdutoPesquisa from "./componentes/CardProdutoPesquisa";
import { geolocation } from "../../utils/geolocation";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router";
import { Select, MenuItem } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import DistanceFilter from "./componentes/DistanceFilter";
import { useLocation } from "react-router-dom";

function TelaPesquisa(props) {
    const navigate = useNavigate();
    const {nomePesquisado} = location.state || {};

    const [originCoordinates, setOriginCoordinates] = useState({ lat: null, lon: null });
    const [produtos, setProdutos] = useState([]);
    //filtros
    const [metodosPagamento, setMetodosPagamento] = useState([]);
    const [nome, setNome] = useState(nomePesquisado? nomePesquisado : null);
    const [metodoPagamento, setMetodoPagamento] = useState();
    const [distancia, setDistancia] = useState(50);

    const [mostrarMapa, setMostrarMapa] = useState(false);

    const handleVerNoMapa = () => {
        console.log("Clicou em Ver no mapa");
        setMostrarMapa(!mostrarMapa);
    };

    useEffect(() => {
        console.log("Mostrar Mapa:", mostrarMapa);
        if (mostrarMapa) {
            navigate("/mapa", {
                state: {
                    distancia,
                    nome,
                    metodoPagamento,
                },
            });
        }
    }, [mostrarMapa]);


    useEffect(() => {
        geolocation(setOriginCoordinates);
    }
        , []);

    const handleNomeChange = (novoNome) => {
        setNome(novoNome);
    };

    useEffect(() => {
        toast.loading("Carregando produtos ...");

        api.get("/produtos/mapa", {
            params: {
                latitude: originCoordinates.lat,
                longitude: originCoordinates.lon,
                distancia: distancia,
                nome: nome,
                metodoPagamento: metodoPagamento,
            },
        }).then((response) => {
            setProdutos(response.data ? response.data : []);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            toast.dismiss()
        })
    }
        , [originCoordinates, nome, metodoPagamento, distancia]);


    useEffect(() => {
        getMetodosPagamento();
    }, []);

    const getMetodosPagamento = () => {
        api.get("/metodos-pagamento")
            .then((response) => {
                setMetodosPagamento(response.data ? response.data : []);
            }).catch((error) => {
                console.log(error);
            });
    };

    const handleMetodoChange = (event) => {
        setMetodoPagamento(event.target.value);
    }

    return (
        <div >
            <NavbarRoot.Content>
                <NavbarRoot.ContentTop>
                    <NavbarRoot.Logo />
                    <NavbarRoot.Pesquisa onChange={handleNomeChange} />
                    {sessionStorage.USERDETAILS ? (<NavbarRoot.Authenticated />) : (<NavbarRoot.Sign />)}

                </NavbarRoot.ContentTop>
                <NavbarRoot.Menu>
                    <NavbarRoot.Item></NavbarRoot.Item>
                </NavbarRoot.Menu>
            </NavbarRoot.Content>

            <main className="flex pt-[48px] flex-col items-center gap-[48px]">
                <main className="flex w-auto flex-col items-center gap-[48px]">
                    <div className="flex flex-row w-full justify-between items-center ">
                        <div className="flex w-[715px] h-[39px] gap-10 pl-4">
                            <div className="flex pt-2 pr-2 pb-2 pl-2 p-10 items-center border-2 gap-4">
                                <Select
                                    className="w-full h-10 bg-white-principal"
                                    onClick={getMetodosPagamento}
                                    onChange={handleMetodoChange}
                                    value={metodoPagamento ? metodoPagamento : []}
                                >
                                    {metodosPagamento?.map((metodo) => (
                                        <MenuItem key={metodo.id} value={metodo.descricao}>
                                            {metodo.descricao}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </div>
                            <div className="flex pt-2 pr-2 pb-2 pl-2 items-center border-2 gap-4">
                                <DistanceFilter onChange={(filter) => setDistancia(filter)} />
                            </div>
                        </div>
                        <div className="flex w-[200px] justify-end items-center gap-3">
                            <p className="" onClick={handleVerNoMapa}>
                                Ver no mapa
                            </p>
                            <Switch onClick={handleVerNoMapa}></Switch>
                        </div>
                    </div>

                    <div className="flex w-full gap-10 items-center pl-4">
                        <h2 className="text-xl">
                            Resultado da pesquisa:
                        </h2>
                        <p className="text-xl">
                            Teste
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {produtos?.map((produto) => (
                            <CardProdutoPesquisa key={produto?.id} produto={produto} />
                        ))}
                    </div>
                </main>
            </main>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default TelaPesquisa;