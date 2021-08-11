import { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    Typography,
    Paper,
    CardActionArea,
    Button
} from '@material-ui/core';

import Dropdown from '@/components/pokebuilder/dropDown';
import SelectModal from '@/components/pokebuilder/selectModal';

import usePokestore from '@/utils/store/pokestore';
import useStore from '@/utils/store/store';

export async function getServerSideProps(context) {
    return {
        props: {
            backgroundurl: '/graphics/pokebuilder/pokebackground.jpg',
            query: context.query
        }
    };
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    paperModal: {
        width: '90vw',
        maxHeight: '90vh',
        overflowY: 'scroll'
    },
    pokemonSelect: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    },
    pokemonImage: {
        width: '100%',
        height: 'auto',
        [theme.breakpoints.down('md')]: {
            width: '30%'
        },
    },
    cardStyle: {
        padding: theme.spacing(2),
        textAlign: 'center',
        height: '100%',
    },
    bars: {
        display: 'block',
        height: '100%',
        backgroundColor: 'green',
        textIndent: '10px',
        overflow: 'hidden',
        color: 'white',
        borderRadius: '5px',
        textAlign: 'left'
    }
}));

const pokeSpriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const initialState = {
    abilities: [],
    types: [],
    stats: [{
        "base_stat": 0,
        "stat": {
            "name": "hp",
        }
    }, {
        "base_stat": 0,
        "stat": {
            "name": "attack",
        }
    }, {
        "base_stat": 0,
        "stat": {
            "name": "defense",
        }
    }, {
        "base_stat": 0,
        "stat": {
            "name": "special-attack",
        }
    }, {
        "base_stat": 0,
        "stat": {
            "name": "special-defense",
        }
    }, {
        "base_stat": 0,
        "stat": {
            "name": "speed",
        }
    },],
}

const Pokemon = (props) => {
    const classes = useStyles();

    const { router } = useStore(state => state);
    const { pos } = props.query;
    const { team, region, setPokemonTeam } = usePokestore((state) => state);
    const [open, setOpen] = useState(false);
    const [pokemon, setPokemon] = useState("Click to Select Pokemon");
    const [pokemonID, setPokemonID] = useState(0);
    const [pokemonData, setPokemonData] = useState(initialState);
    const [itemData, setItemData] = useState([]);
    const [natureData, setNatureData] = useState([]);
    const [pokemonImage, setPokemonImage] = useState("/graphics/pokebuilder/defaultPokemon.png");
    const [ability, setAbility] = useState("");
    const [heldItem, setHeldItem] = useState("");
    const [nature, setNature] = useState("");
    const [moves, setMoves] = useState(["", "", "", ""])
    //add EV's at some point

    const selectPokemon = (id, name) => {
        setPokemonID(id);
        setPokemonImage(`${pokeSpriteUrl}${id}.png`);
        setPokemon(name.toUpperCase());
        setOpen(false);
    };

    const savePokemon = () => {
        if (pokemonID != 0) {
            setPokemonTeam(pos, {
                "pokemon": pokemon,
                "type": pokemonData.types,
                "ability": ability,
                "item": heldItem,
                "nature": nature,
                "moves": moves,
                "id": pokemonID,
            })
            router.push("/projects/pokemonbuilder")
        }
    };


    useEffect(() => {
        if(pos === undefined) {
            return;
        }
        if (Object.keys(team[pos]).length !== 0) {
            setPokemonID(team[pos].id);
            setPokemonImage(`${pokeSpriteUrl}${team[pos].id}.png`);
            setPokemon(team[pos].pokemon);
            setAbility(team[pos].ability);
            setHeldItem(team[pos].item);
            setNature(team[pos].nature);
            setMoves(team[pos].moves);
        }
    }, [])

    useEffect(() => {
        const getPokemon = async () => {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemonID}`,
                {
                    method: 'GET',
                    cache: 'default',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(response => response.json())
                .catch((error) => {
                    console.error('Error:', error);
                });
            setPokemonData(response);
        };
        const getItems = async () => {
            const response = await fetch(
                `https://pokeapi.co/api/v2/item-attribute/5`,
                {
                    method: 'GET',
                    cache: 'default',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(response => response.json())
                .catch((error) => {
                    console.error('Error:', error);
                });
            setItemData(response.items);
        };
        const getNatures = async () => {
            const response = await fetch(
                `https://pokeapi.co/api/v2/nature/?limit=25`,
                {
                    method: 'GET',
                    cache: 'default',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(response => response.json())
                .catch((error) => {
                    console.error('Error:', error);
                });
            setNatureData(response.results);
        };

        if (pokemonID != 0) {
            getItems();
            getNatures();
            getPokemon();
        }
    }, [pokemonID]);

    return (
        <Fragment>
            <SelectModal
                open={open}
                pokeSpriteUrl={pokeSpriteUrl}
                selectPokemon={selectPokemon}
                setOpen={setOpen}
            />
            <Grid
                spacing={3}
                container
            >
                <Grid
                    lg={4}
                    xs={12}
                    item
                >
                    <Card>
                        <CardActionArea
                            className={classes.cardStyle}
                            onClick={() => setOpen(true)}
                        >
                            <img
                                alt="pokemon"
                                className={classes.pokemonImage}
                                src={pokemonImage}
                            />
                            <Typography
                                variant="h6"
                            >
                                {pokemon}
                            </Typography>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid
                    lg={8}
                    item
                >
                    <Card
                        className={classes.cardStyle}
                    >
                        <Grid
                            container
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid
                                item
                                xs={2}
                            >
                                <Typography>
                                    Type:
                                </Typography>
                            </Grid>
                            <Grid
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly'
                                }}
                                xs={10}
                                item
                            >
                                {pokemonData.types.map((item, i) => {
                                    return (
                                        <img
                                            height={18}
                                            key={"type" + i}
                                            placeholder={item.type.name}
                                            src={`https://www.serebii.net/pokedex-bw/type/${item.type.name}.gif`}
                                        />
                                    )
                                })}
                            </Grid>
                            <Grid
                                xs={2}
                                item
                            >
                                <Typography>
                                    Ability:
                                </Typography>
                            </Grid>
                            <Grid
                                xs={10}
                                item
                            >
                                <Dropdown
                                    concat="ability"
                                    label="Abilities"
                                    list={pokemonData.abilities}
                                    onChange={setAbility}
                                    value={ability}
                                />
                            </Grid>
                            <Grid
                                xs={2}
                                item
                            >
                                <Typography>
                                    Base Stats:
                                </Typography>
                            </Grid>
                            <Grid
                                style={{
                                    alignItems: "flex-start"
                                }}
                                xs={10}
                                container
                                item
                            >
                                {pokemonData.stats.map((item, i) => {
                                    return (
                                        <Fragment
                                            key={"stat" + i}
                                        >
                                            <Grid
                                                sm={2}
                                                style={{ textAlign: 'left' }} 
                                                xs={12}
                                                item
                                            >
                                                <Typography>
                                                    {item.stat.name.toUpperCase()}:
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                sm={10}
                                                xs={12} 
                                                item
                                            >
                                                <span
                                                    className={classes.bars}
                                                    style={{ width: `${item.base_stat > 180 ? 100 : item.base_stat / 1.8}%` }}
                                                >
                                                    {item.base_stat}
                                                </span>
                                            </Grid>
                                        </Fragment>
                                    )
                                })}
                            </Grid>
                            <Grid
                                xs={2}
                                item
                            >
                                <Typography>
                                    Item:
                                </Typography>
                            </Grid>
                            <Grid
                                xs={10}
                                item
                            >
                                <Dropdown
                                    label="Items"
                                    list={itemData}
                                    onChange={setHeldItem}
                                    value={heldItem}
                                />
                            </Grid>
                            <Grid
                                xs={2}
                                item
                            >
                                <Typography>
                                    Nature:
                                </Typography>
                            </Grid>
                            <Grid
                                xs={10}
                                item
                            >
                                <Dropdown
                                    label="Natures"
                                    list={natureData}
                                    onChange={setNature}
                                    value={nature}
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid
                    xs={12}
                    item
                >
                    <Paper
                        className={classes.cardStyle}
                    >
                        <Grid
                            alignItems="center"
                            spacing={2}
                            container
                        >
                            {moves.map((_, i) => {
                                return (
                                    <Grid
                                        key={"moves" + i}
                                        md={6}
                                        xs={12}
                                        item
                                    >
                                        <Dropdown
                                            concat="move"
                                            label="Moves"
                                            list={pokemonData.moves || []}
                                            onChange={(e) => setMoves([
                                                ...moves.slice(0, i),
                                                e,
                                                ...moves.slice(i + 1)
                                            ])}
                                            value={moves[i]}
                                        />
                                    </Grid>
                                )
                            })
                            }
                        </Grid>
                    </Paper>

                </Grid>
                <Grid
                    spacing={2}
                    container
                    item
                >
                    <Grid
                        md={6}
                        xs={12}
                        item
                    >

                        <Button
                            onClick={savePokemon}
                            style={{ width: '100%' }}
                            variant="contained"
                        >
                            Save
                        </Button>
                    </Grid>
                    <Grid
                        md={6}
                        xs={12}
                        item
                    >
                        <Button
                            onClick={() => router.push("/projects/pokemonbuilder")}
                            style={{ width: '100%' }}
                            variant="contained"
                        >
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

        </Fragment >
    )
}

const PokemonPage = (props) => {
    return (
        <Fragment>
            <Pokemon 
                {...props}
            />
        </Fragment>
    )
}

export default PokemonPage;