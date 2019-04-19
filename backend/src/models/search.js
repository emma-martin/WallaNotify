const search = (sequelize, DataTypes) => {
    const Search = sequelize.define('search', {
        kws: { type: DataTypes.STRING, allowNull: false },
        searchPosName: { type: DataTypes.STRING, allowNull: false },
        dist: { type: DataTypes.INTEGER, allowNull: false },
        order: { type: DataTypes.STRING, allowNull: false },
        maxPrice: { type: DataTypes.INTEGER, allowNull: false },
        minPrice: { type: DataTypes.INTEGER, allowNull: false },
        publishDate: { type: DataTypes.INTEGER, allowNull: false },
    });

    Search.associate = models => {
        Search.belongsTo(models.User);
    };

    return Search;
};

export default search;