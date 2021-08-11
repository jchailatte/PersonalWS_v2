import { Fragment } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardActionArea,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from '@material-ui/core';
import { ControlPoint } from '@material-ui/icons';

import InfoCard from '@/components/pokebuilder/infoCard';

import usePokestore from '@/utils/store/pokestore';

export async function getStaticProps() {
    return {
        props: {
            backgroundurl: '/graphics/pokebuilder/pokebackground.jpg'
        }
    };
}

const useStyles = makeStyles(theme => ({
    regionSelect: {
        backgroundColor: 'white',
        width: '100%'
    },
    cardStyle: {
        display: 'flex',
        padding: theme.spacing(3),
        textAlign: 'center',
        minHeight: '20vh',
        height: '100%'
    }
}));

const regions = [
    "All",
    "Kanto(I)",
    "Johto(II)",
    "Hoenn(III)",
    "Sinnoh(IV)",
    "Unova(V)",
    "Kalos(VI)",
    "Alola(VII)",
    "Galar(VIII)"
]

const Index = () => {
    const classes = useStyles();

    const { region, team, setRegion } = usePokestore((state) => state);

    const selectRegion = (event) => {
        setRegion(event.target.value);
    }

    return (
        <Fragment>
            <Grid
                spacing={3}
                container
            >
                <Grid
                    xs={12}
                    item
                >
                    <FormControl
                        variant="filled"
                        style={{ width: '100%' }}
                    >
                        <InputLabel>
                            Region
                        </InputLabel>
                        <Select
                            className={classes.regionSelect}
                            label="Region"
                            onChange={selectRegion}
                            value={region}

                        >
                            <MenuItem
                                value={0}
                            >
                                <em>None</em>
                            </MenuItem>
                            {regions.map((item, i) => {
                                return (
                                    <MenuItem
                                        key={"select" + i}
                                        value={i + 1}
                                    >
                                        {item}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                {team && team.map((pokemon, i) => {
                    return (
                        <Grid
                            key={i}
                            md={6}
                            sm={12}
                            xs={12}
                            item
                        >
                            {Object.keys(pokemon).length === 0 ?
                                (
                                    <Card
                                        style={{ height: '100%' }}
                                    >
                                        <Link
                                            href={{
                                                pathname: `pokemonbuilder/pokemon`,
                                                query: { pos: i }
                                            }}
                                        >
                                            <CardActionArea
                                                className={classes.cardStyle}
                                            >
                                                <ControlPoint />
                                            </CardActionArea>
                                        </Link>
                                    </Card>
                                ) : (
                                    <InfoCard
                                        pokemon={team[i]}
                                    />
                                )
                            }
                        </Grid>
                    )
                })
                }
            </Grid>
        </Fragment >
    )
}

const IndexPage = () => {
    return (
        <Fragment>
            <Index/>
        </Fragment>
    )
}

export default IndexPage;