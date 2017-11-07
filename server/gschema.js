const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = require('graphql');

const SongType = new GraphQLObjectType({
  name: 'Song',
  description: '...',
  fields: {
    title_with_featured: { type: GraphQLString },
    header_image_thumbnail_url: { type: GraphQLString },
    url: { type: GraphQLString },
    // album: { type: GraphQLString },
    primary_artist: { type: GraphQLString },
    writer_artists: { type: new GraphQLList(GraphQLString) },
    producer_artists: { type: new GraphQLList(GraphQLString) }
  }
});

const ArtistType = new GraphQLObjectType({
  name: 'Artist',
  description: '...',
  fields: {
    name: { type: GraphQLString }
  }
});

const axiosConfigForRapGenius = {
  'Authorization' : 'Bearer CY7DUGhn8enS_FHK4LxT-fZPUt2QCCNvg346ZLH_86nbzYIoqmxO6o19MrAIpJiO'
}

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RG',
    description: '...',
    fields: () => ({
      song: {
        type: SongType,
        // args: {
        //   id: {type: GraphQLInt}
        // },
        resolve: () => {
          axios.get(`http://api.genius.com/songs/${2437013}`, axiosConfigForRapGenius)
        }
      }
    })
  })
})
