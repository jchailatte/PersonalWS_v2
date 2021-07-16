import { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Modal,
    Fade,
    Paper,
} from '@material-ui/core';

import usePokestore from '@/utils/store/pokestore';

export async function getStaticProps() {
    return {
        props: {
            backgroundurl: '/graphics/pokebuilder/pokebackground.jpg'
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
}));

const Index = () => {
    const classes = useStyles();

    const { team, region } = usePokestore((state) => state);
    const [open, setOpen] = useState(false);
    const [pokemonList, setPokemonList] = useState({});

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const getPokemonList = async () => {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokedex/${region}`,
            {
                method: 'GET',
                cache: 'default',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => response.json())
            .then(data => {
                setPokemonList(data.pokemon_entries)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        handleOpen();
        getPokemonList();
    }, [])

    return (
        <Fragment>
            <Modal
                className={classes.modal}
                onClose={handleClose}
                open={open}
                closeAfterTransition
            >
                <Fade
                    in={open}
                >
                    <Paper
                        className={classes.paperModal}
                    >
                        <Grid
                            justify="center"
                            container
                        >

                                {pokemonList && pokemonList.map((entry, i) => {
                                    return (
                                        <Grid
                                            key={i}
                                            item
                                        >
                                            <img
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${entry.entry_number}.png`}
                                            />
                                        </Grid>
                                    )
                                })}
                        </Grid>
                    </Paper >
                </Fade >
            </Modal >
        </Fragment >
    )
}

export default Index;