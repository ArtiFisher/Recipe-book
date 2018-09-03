const graphql = require('graphql');
const RecipeModel = require('../models/recipe');
const IngredientModel = require('../models/ingredient');

const { GraphQLObjectType,
     GraphQLString,
     GraphQLSchema,
     GraphQLID,
     GraphQLInt,
     GraphQLList,
     GraphQLNonNull,
     } = graphql;

const recipes = [
    { name: 'NedoPlov', id: '1', description: 'Rice, Meat', ingredients: ['1', '2'], amounts: [200, 600], },
    { name: 'Navy Pasta', id: '2', description: 'Pasta, Canned Meat', ingredients: ['3', '4'], amounts: [400, 250], },
    { name: 'Sandwiches', id: '3', description: 'Bread, Cheese, Fuagra', ingredients: ['5', '6', '7'], amounts: [2, 1, 50], },
];

const ingredients = [
    { name: 'Rice', id: '1', unit: 'g' },
    { name: 'Meat', id: '2', unit: 'g' },
    { name: 'Pasta', id: '3', unit: 'g' },
    { name: 'Canned Meat', id: '4', unit: 'g' },
    { name: 'Bread', id: '5', unit: 'pc' },
    { name: 'Cheese', id: '6', unit: 'pc' },
    { name: 'Fuagra', id: '7', unit: 'g' },
];

const Recipe = new GraphQLObjectType({
    name: 'Recipe',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        ingredients: {
            type: new GraphQLList(Ingredient),
            resolve(parent, args) {
                // return ingredients.filter(ingredient => parent.ingredients.includes(ingredient.id));
                return parent.ingredients.reduce((array, id) => {
                    const found = IngredientModel.findById(id);
                    if(found) {
                        array.push(found);
                    }
                    return array;
                }, []);
            }
        },
        amounts: { type: new GraphQLList(GraphQLInt) },
    }),
});

const Ingredient = new GraphQLObjectType({
    name: 'Ingredient',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        unit: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        recipe: {
            type: Recipe,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return recipes.find(item => item.id == args.id);
                return RecipeModel.findById(args.id);
            }
        },
        ingredient: {
            type: Ingredient,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return ingredients.find(item => item.id == args.id);
                return IngredientModel.findById(args.id);
            }
        },
        recipes: {
            type: new GraphQLList(Recipe),
            resolve(parent, args) {
                // return recipes;
                return RecipeModel.find();
            }
        },
        ingredients: {
            type: new GraphQLList(Ingredient),
            resolve(parent, args) {
                // return ingredients;
                return IngredientModel.find();
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addRecipe: {
            type: Recipe,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                ingredients: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
                amounts: { type: new GraphQLList(GraphQLInt) },
            },
            resolve(parent, args){
                const recipe_record = new RecipeModel({
                    name: args.name,
                    ingredients: args.ingredients,
                    amounts: args.amounts,
                });
                return recipe_record.save();
            }
        },
        addIngredient: {
            type: Ingredient,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                unit: { type: new GraphQLNonNull(GraphQLString) },                
            },
            resolve(parent, args){
                const ingredient_record = new IngredientModel({
                    name: args.name,
                    unit: args.unit,
                });
                return ingredient_record.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});