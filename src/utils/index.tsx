import {Alert, Platform} from 'react-native';
import RNFS from 'react-native-fs';
import {AdEventType, InterstitialAd} from 'react-native-google-mobile-ads';

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
import {cat_type, setting_type} from '../types/Genius/db';
import {pngFiles} from './fileNames';
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
      link: 'https://babyflashcards.com/apps.html',
    },
    {
      _id: 16,
      cate_name: 'Reivew',
      cat_img: require('../assets/Image_Cat/review_app.png'),
      link: 'https://play.google.com/store/apps/details?id=com.eFlash2&feature=search_result&pli=1#?t=W251bGwsMSwxLDEsImNvbS5lRmxhc2gyIl0.',
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

              if (tableName === 'tbl_items') {
                const imageFileName = row['Image'];

                const isPng = pngFiles.some(pngFile => {
                  const nameWithoutExtension = pngFile.replace(/\.[^/.]+$/, '');
                  return imageFileName === nameWithoutExtension;
                });

                row = {
                  ...row,
                  Image: isPng
                    ? `${row['Image']
                        .toLocaleLowerCase()
                        .replace(/\s/g, '')}.png`
                    : `${row['Image']
                        .toLocaleLowerCase()
                        .replace(/\s/g, '')}.jpg`,
                };
              }

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

  static addIts = {
    ...Platform.select({
      android: {
        BANNER: 'ca-app-pub-3339897183017333/9872014788',
        INTERSTITIAL: 'ca-app-pub-3339897183017333/9872014788',
      },
      ios: {
        BANNER: 'ca-app-pub-3940256099942544/6300978111',
        INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
      },
    }),
  };

  static showAdd = () => {
    const requestOption = {
      requestNonPersonalizedAdsOnly: true,
    };

    const interstitial = InterstitialAd.createForAdRequest(
      this.addIts.INTERSTITIAL ? this.addIts.INTERSTITIAL : '',
      requestOption,
    );

    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      },
    );
    interstitial.load();
    return unsubscribe;
  };

  static updateSettings = (item: setting_type[0]) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'UPDATE  tbl_settings set Voice=?,Game=?,' +
          'GameLevel=?,RandomOrder=?,Swipe=?' +
          ' WHERE _id=1',
        [item.Voice, item.Game, item.GameLevel, item.RandomOrder, item.Swipe],
        (tx: any, results: any) => {
          console.log('Query completed');
        },
        (err: any) => {
          console.log(err);
        },
      );
    });
  };

  static createDuplicate = (array: cat_type) => {
    return new Promise<cat_type>(resovle => {
      const duplicateArray = array.flatMap(item => [item, item]);
      resovle(duplicateArray);
    });
  };
  static shuffleArray = (array: cat_type) => {
    return new Promise<cat_type>((resolve, reject) => {
      try {
        const shuffledArray = [...array];

        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
          ];
        }

        resolve(shuffledArray);
      } catch (error) {
        reject(error);
      }
    });
  };
  static pickRandomOption = (array: any, length: number) => {
    return new Promise<cat_type>(async (resolve, reject) => {
      try {
        if (length > array.length) {
          reject(new Error('Length exceeds the array size'));
          return;
        }

        const shuffledArray = await this.shuffleArray(array);
        const randomArray = shuffledArray.slice(0, length);

        resolve(randomArray);
      } catch (error) {
        reject(error);
      }
    });
  };
  static getMemory = async (count: number, Category: string | null) => {
    return new Promise<cat_type>(async resovle => {
      const db_items = await utils.db('tbl_items', Category, true, count);
      const dup = await utils.createDuplicate(db_items);
      const data = await utils.pickRandomOption(dup, dup.length);
      resovle(data);
    });
  };

  // static WrongVoid = [
  //   {
  //     url: require('../../asset2/uhoh.mp3'), // Load media from the file system
  //     title: 'uhoh',
  //     artist: 'eFlashApps',
  //     duration: null,
  //   },
  //   {
  //     url: require('../../asset2/tryagain.mp3'), // Load media from the file system
  //     title: 'tryagain',
  //     artist: 'eFlashApps',
  //     duration: null,
  //   },
  //   {
  //     url: require('../../asset2/oopsie.mp3'), // Load media from the file system
  //     title: 'oopsie',
  //     artist: 'eFlashApps',
  //     duration: null,
  //   },
  //   {
  //     url: require('../../asset2/youcandoit.mp3'), // Load media from the file system
  //     title: 'youcandoit',
  //     artist: 'eFlashApps',
  //     duration: null,
  //   },
  // ];
  static RightVoice = [
    {
      url: `${this.path}excellent.mp3`, // Load media from the file system
      title: 'excellent',
      artist: 'eFlashApps',
      artwork: `${this.path}excellent.mp3`,
      duration: 2,
    },
    {
      url: `${this.path}fantastic.mp3`, // Load media from the file system
      title: 'fantastic',
      artist: 'eFlashApps',
      artwork: `${this.path}fantastic.mp3`,
      duration: 2,
    },
    {
      url: `${this.path}goodanswer.mp3`, // Load media from the file system
      title: 'goodanswer',
      artist: 'eFlashApps',
      // Load artwork from the file system:
      artwork: `${this.path}goodanswer.mp3`,
      duration: 2,
    },
    {
      url: `${this.path}goodjob.mp3`, // Load media from the file system
      title: 'goodjob',
      artist: 'eFlashApps',
      // Load artwork from the file system:
      artwork: `${this.path}goodjob.mp3`,
      duration: 2,
    },
    {
      url: `${this.path}great.mp3`, // Load media from the file system
      title: 'great',
      artist: 'eFlashApps',
      // Load artwork from the file system:
      artwork: `${this.path}great.mp3`,
      duration: 2,
    },
    {
      url: `${this.path}marvelous.mp3`, // Load media from the file system
      title: 'marvelous',
      artist: 'eFlashApps',
      // Load artwork from the file system:
      artwork: `${this.path}marvelous.mp3}`,
      duration: 2,
    },
    {
      url: `${this.path}sensational.mp3`, // Load media from the file system
      title: 'sensational',
      artist: 'eFlashApps',
      // Load artwork from the file system:
      artwork: `${this.path}sensational.mp3`,
      duration: 2,
    },
    {
      url: `${this.path}spectacular.mp3`, // Load media from the file system
      title: 'spectacular',
      artist: 'eFlashApps',
      // Load artwork from the file system:,
      artwork: `${this.path}spectacular.mp3`,
      duration: 5,
    },
  ];
  static getRandomVoice = async () => {
    const data = await this.pickRandomOption(this.RightVoice, 1);
    return data[0];
  };
}
