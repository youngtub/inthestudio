const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat
} = require('graphql');



const config = {
  headers: {
    'Authorization' : 'Bearer BQA3hKQ6BewZ2wvieqbeh7DjJM5Gmo4koJdaow7NRZA-Z8-uIRnxquuUdeEM31M98ui7oyGuNitfWLKCSsSXbA'
  }
}

const BarsType = new GraphQLObjectType({
  name: 'bars',
  description: '...',
  fields: () => ({
    start: {
      type: GraphQLFloat,
      resolve: res => res.start
    },
    duration: {
      type: GraphQLFloat,
      resolve: res => res.duration
    },
    confidence: {
      type: GraphQLFloat,
      resolve: res => res.confidence
    }
  })
});

const SectionsType = new GraphQLObjectType({
  name: 'songSections',
  description: '...',
  fields: () => ({
    start: {
      type: GraphQLFloat,
      resolve: res => res.start
    },
    duration: {
      type: GraphQLFloat,
      resolve: res => res.duration
    },
    confidence: {
      type: GraphQLFloat,
      resolve: res => res.confidence
    }
  })
})

const SegmentsType = new GraphQLObjectType({
  name: 'songSegments',
  description: '...',
  fields: () => ({
    start: {
      type: GraphQLFloat,
      resolve: res => res.start
    },
    duration: {
      type: GraphQLFloat,
      resolve: res => res.duration
    },
    confidence: {
      type: GraphQLFloat,
      resolve: res => res.confidence
    },
    pitches: {
      type: new GraphQLList(GraphQLFloat),
      resolve: res => res.pitches
    },
    timbre: {
      type: new GraphQLList(GraphQLFloat),
      resolve: res => res.timbre
    }
  })
})

const SongType = new GraphQLObjectType({
  name: 'song',
  description: 'fromSpotify',
  fields: () => ({
    duration: {
      type: GraphQLFloat,
      resolve: res => res.track.duration
    },
    endOfFadeIn: {
      type: GraphQLFloat,
      resolve: res => res.track.end_of_fade_in
    },
    startOfFadeOut: {
      type: GraphQLFloat,
      resolve: res => res.track.start_of_fade_out
    },
    loudness: {
      type: GraphQLFloat,
      resolve: res => res.track.loudness
    },
    tempo: {
      type: GraphQLFloat,
      resolve: res => res.track.tempo
    },
    key: {
      type: GraphQLInt,
      resolve: res => res.track.key
    },
    mode: {
      type: GraphQLInt,
      resolve: res => res.track.mode
    },
    bars: {
      type: new GraphQLList(BarsType),
      resolve: res => res.bars
    },
    sections: {
      type: new GraphQLList(SectionsType),
      resolve: res => res.sections
    },
    segments: {
      type: new GraphQLList(SegmentsType),
      resolve: res => res.segments
    }
  })
});

//add rapGenius stuff here

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'SpotifySong',
    description: '...',
    fields: () => ({
      song: {
        type: SongType,
        args: {
          id: {type: GraphQLString}
        },
        resolve: (root, args) => {
          return axios.get(`https://api.spotify.com/v1/audio-analysis/${args.id}`, config)
          .then((res) => res.data)
          .catch((err) => console.log('ERROR', err))
        }
      }
    })
  })
});

/*

query {
  song(id: "1wWRtPIKD7ZNvtsrzLyTev") {
    duration
    endOfFadeIn
    startOfFadeOut
    loudness
    tempo
    key
    mode
    bars {
      start
      duration
      confidence
    }
    sections {
      start
      duration
      confidence
    }
    segments {
      start
      duration
      confidence
      pitches
      timbre
    }
  }
}

*/
