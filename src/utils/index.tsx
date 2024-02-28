import {Platform} from 'react-native';
import RNFS from 'react-native-fs';

var SQLite = require('react-native-sqlite-storage');
const db = SQLite.openDatabase({
  name: 'eFlash2.db',
  createFromLocation: 1,
});
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';
import type {AddTrack} from 'react-native-track-player';
type dbData = {};
export default class utils {
  static Categoreis = [
    {
      _id: 0,
      cate_name: 'HumanBody',
      cat_img: require('../assets/Image_Cat/body.png'),
    },
    {
      _id: 1,
      cate_name: 'Tools',
      cat_img: require('../assets/Image_Cat/tools.png'),
    },
    {
      _id: 2,
      cate_name: 'Action',
      cat_img: require('../assets/Image_Cat/action.png'),
    },
    {
      _id: 3,
      cate_name: 'DoctorsKit',
      cat_img: require('../assets/Image_Cat/doctor_kit.png'),
    },
    {
      _id: 4,
      cate_name: 'Places',
      cat_img: require('../assets/Image_Cat/places.png'),
    },
    {
      _id: 5,
      cate_name: 'Games',
      cat_img: require('../assets/Image_Cat/sports.png'),
    },
    {
      _id: 6,
      cate_name: 'Profession',
      cat_img: require('../assets/Image_Cat/profassional.png'),
    },
    {
      _id: 7,
      cate_name: 'Plants',
      cat_img: require('../assets/Image_Cat/plant.png'),
    },
    {
      _id: 8,
      cate_name: 'Space',
      cat_img: require('../assets/Image_Cat/space.png'),
    },
    {
      _id: 9,
      cate_name: 'BabyAnimal',
      cat_img: require('../assets/Image_Cat/animal_kid.png'),
    },
    {
      _id: 10,
      cate_name: 'Christmas',
      cat_img: require('../assets/Image_Cat/cristmas.png'),
    },
    {
      _id: 11,
      cate_name: 'Hallow',
      cat_img: require('../assets/Image_Cat/halloween.png'),
    },
    {
      _id: 12,
      cate_name: 'AnimalHouse',
      cat_img: require('../assets/Image_Cat/animal_house.png'),
    },
    {
      _id: 13,
      cate_name: 'AnimalBody',
      cat_img: require('../assets/Image_Cat/animal_body_parts.png'),
    },

    {
      _id: 15,
      cate_name: 'More',
      cat_img: require('../assets/Image_Cat/eflashmore.png'),
    },
    {
      _id: 16,
      cate_name: 'Reivew',
      cat_img: require('../assets/Image_Cat/review_app.png'),
    },
  ];

  static setupPlayer = async () => {
    let isSetup = false;
    try {
      await TrackPlayer.getCurrentTrack();
      isSetup = true;
    } catch {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
        ],
        progressUpdateEventInterval: 2,
      });

      isSetup = true;
    } finally {
      return isSetup;
    }
  };

  static player = async (track: AddTrack) => {
    const isSetup = await this.setupPlayer();
    if (isSetup) {
      await TrackPlayer.reset();
      await TrackPlayer.add(track);
      await TrackPlayer.play();
    }
  };
  static resetPlayer = async () => {
    const isSetup = await this.setupPlayer();
    if (isSetup) {
      await TrackPlayer.reset();
    }
  };

  static path = Platform.select({
    android: 'asset:/files/',
    ios: RNFS.MainBundlePath + '/files/',
  });

  static db = async (
    tableName: string,
    category: string | null = null,
    random: boolean = false,
    limit: number = 0,
  ) => {
    return new Promise<any>((resolve, reject) => {
      let data: any = [];
      db.transaction((tx: any) => {
        let sqlQuery = `SELECT * FROM ${tableName}`;

        if (category !== null) {
          sqlQuery += ` WHERE Category = ?`;
        }

        if (random) {
          sqlQuery += ` ORDER BY RANDOM()`;
        }

        if (limit > 0) {
          sqlQuery += ` LIMIT ?`;
        }

        let params = [];
        if (category !== null) {
          params.push(category);
        }
        if (limit > 0) {
          params.push(limit);
        }

        tx.executeSql(
          sqlQuery,
          params,
          (tx: any, results: any) => {
            let len = results.rows.length;
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              data.push(row);
            }
            resolve(data);
          },
          (err: any) => {
            console.log(err);
            reject(err);
          },
        );
      });
    });
  };
}
