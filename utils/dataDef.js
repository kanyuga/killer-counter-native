import baseStyles from './styles';

export const playTypes = {
    port: {
        label: 'Port',
        color: baseStyles.colors.primaryDark,
        logTemplate: '$player$ ported $ball$'
    },
    hit: {
        label: 'Hit',
        color: 'grey',
        logTemplate: '$player$ ported $ball$',
    },
    miss: {
        label: 'Miss',
        color: baseStyles.colors.secondary,
        logTemplate: '$player$ missed $ball$',
    },
    foulPort: {
        label: 'Foul Port',
        color: baseStyles.colors.secondaryDark,
        logTemplate: '$player$ ported $ball$ illegally',
    },
    portCurrentAndWhiteBall: {
        label: 'Port Current Ball and White Ball',
        color: baseStyles.colors.secondaryLight,
        logTemplate: '$player$ ported $ball$ and then the white ball',
    },
};

export class Player {
    active = true;
    score = 0;
    name = null;

    constructor(name) {
        this.name = name;
    }
}

export class Ball {
    active = true;
    points = 0;
    number = null;

    constructor(number) {
        this.number = number;
        this.points = (number < 3 ? number + 15: number === 3 ? 6 : number);
    }
}