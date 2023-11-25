import Post from "../pages/post"
import Login from "../pages/login"
import Editor from "../pages/editor"
import { faker } from '@faker-js/faker'

const post = new Post()
const login = new Login()
const editor = new Editor()

describe("F001 post", () => {
    let cockieValue;
    let datosValidos;

    before(() => {
        login.insertLogin()
        cy.getCookie('ghost-admin-api-session').then((cookie) => {
            cockieValue = cookie.value;
        });
    })

    beforeEach(() => {
        cy.log(`AND: I get priori data`);

        cy.fixture('post/post-valid.json').then((datos) => {
            datosValidos = datos;
        });
    })

    beforeEach(() => {
        cy.log(`GIVEN: I login in ghost admin`)
        cy.setCookie('ghost-admin-api-session', cockieValue)
    })

    describe('EP001 create post - ALEATORIO', () => {
        it('should create post', () => {
            const namePost = faker.animal.bear()

            cy.ands('I visit post page', () => {
                post.visit()
            })

            cy.ands('I click on new post page', () => {
                post.clickNewPost()
            })

            cy.when('I insert title', () => {
                editor.fillTitle(namePost, 'Post title')
            })

            cy.ands('I insert content', () => {
                editor.fillContent(faker.lorem.paragraphs())
            })

            cy.ands('I publish post', () => {
                editor.publish()
            })

            cy.then2('I see post published in list', () => {
                post.verifyPostPublished(namePost)
            })
        })
    })

    describe('EP002 edit post - ALEATORIO', () => {
        it('should edit post', () => {
            const namePost = faker.animal.bear()
            const newNamePost = faker.animal.cat()

            cy.ands('I visit post page', () => {
                post.visit()
            })

            cy.ands('I create post', () => {
                post.createPost(namePost)
            })

            cy.ands('I click on post', () => {
                post.getPostByTitle(namePost).click()
            })

            cy.when('I insert title', () => {
                editor.fillTitle(newNamePost, 'Post title')
            })

            cy.ands('I insert content', () => {
                editor.fillContent(faker.lorem.paragraphs())
            })

            cy.ands('I publish post', () => {
                editor.publish()
            })

            cy.then2('I see post published in list', () => {
                post.verifyPostPublished(newNamePost)
            })
        })
    });

    describe('EP003 create a post with a title longer than 256 characters - ALEATORIO', () => {
        it('should create a post with a title longer than 256 characters', () => {
            const namePost = faker.lorem.words(256).substring(0, 256)

            cy.ands('I visit post page', () => {
                post.visit()
            })

            cy.ands('I click on new post page', () => {
                post.clickNewPost()
            })

            cy.when('I insert title', () => {
                console.log(namePost);
                editor.fillTitle(namePost, 'Post title')
            })

            cy.ands('I insert content', () => {
                editor.fillContent(faker.lorem.paragraphs())
            })

            cy.ands('I publish post', () => {
                editor.publish()
            })

            cy.then2('I see alert Update failed', () => {
                then(post.notificactionUpdateFailed().to.exist)
            })
        })
    })

    describe('EP004 add a valid feature image - APRIORI', () => {
        it('should add a valid feature image', () => {
            const fileName = datosValidos[0].name_image;
            const filePath = 'cypress/fixtures/Post/files/image-valid-post.jpg';

            cy.ands('I visit post page', () => {
                post.visit()
            })

            cy.ands('I click on new post page', () => {
                post.clickNewPost()
            })

            cy.when('I upload image', () => {
                editor.uploadFixtureImage(fileName, filePath)
            })

            cy.then2('I see the image feature', () => {
                expect(editor.getImage(fileName)).exist
            })
        })
    })

    describe('EP005 add a invalid feature image format - APRIORI', () => {
        it('should add a valid feature image', () => {
            const fileName = datosValidos[2].name_image;
            const filePath = 'cypress/fixtures/Post/files/invalid-file.json';

            cy.ands('I visit post page', () => {
                post.visit()
            })

            cy.ands('I click on new post page', () => {
                post.clickNewPost()
            })

            cy.when('I upload image', () => {
                editor.uploadFixtureImage(fileName, filePath)
                cy.wait(1000)
            })

            cy.then2('I see the image feature error message', () => {
                editor.getErrorMessageUploadFixture();
            })
        })
    })

    describe("EP006 add an image to a post - APRIORI", () => {
        it("should add an image to a post", () => {
            const fileName = datosValidos[1].name_image;
            const filePath = 'cypress/fixtures/Post/files/image-valid-post.jpg';

            cy.ands('I visit post page', () => {
                post.visit()
            })

            cy.ands('I click on new post page', () => {
                post.clickNewPost()
            })

            cy.ands('I click in more option', () => {
                editor.clickOptionMore('Image');
            })

            cy.when('I upload image', () => {
                editor.uploadImage(fileName, filePath)
                cy.wait(1000)
            })

            cy.then2('I see the image into post', () => {
                expect(editor.getImage(fileName)).exist
            })
        })
    })

    describe("EP007 add an image invalid to a post - APRIORI", () => {
        it('should add a invalid feature image', () => {
            const fileName = datosValidos[3].name_image;
            const filePath = 'cypress/fixtures/Post/files/invalid-file.json';

            cy.ands('I visit post page', () => {
                post.visit()
            })

            cy.ands('I click on new post page', () => {
                post.clickNewPost()
            })

            cy.ands('I click in more option', () => {
                editor.clickOptionMore('Image');
            })

            cy.when('I upload image', () => {
                editor.uploadImage(fileName, filePath)
                cy.wait(1000)
            })

            cy.then2('I see error message', () => {
                editor.getErrorFileUpload();
            })

            Cypress.on('uncaught:exception', () => {
                return false
            })
        })
    });

    describe("EP008 add a video valid to a post - APRIORI", () => {
        it('should add a valid video', () => {
            const fileName = datosValidos[4].name_video;
            const filePath = 'cypress/fixtures/Post/files/video-valid-post.mp4';

            cy.ands('I visit post page', () => {
                post.visit()
            })

            cy.ands('I click on new post page', () => {
                post.clickNewPost()
            })

            cy.ands('I click in more option', () => {
                editor.clickOptionMore('Video');
            })

            cy.when('I upload video', () => {
                editor.uploadVideo(fileName, filePath)
                cy.wait(1000)
            })

            cy.then2('I see the video into post', () => {
                expect(editor.getImage(fileName)).exist
            })
        })
    })

    describe("EP009 add a video invalid to a post - APRIORI", () => {
        it('should add a invalid video', () => {
            const fileName = datosValidos[5].name_image;
            const filePath = 'cypress/fixtures/Post/files/invalid-file.json';

            cy.ands('I visit post page', () => {
                post.visit()
            })

            cy.ands('I click on new post page', () => {
                post.clickNewPost()
            })

            cy.ands('I click in more option', () => {
                editor.clickOptionMore('Video');
            })

            cy.when('I upload image', () => {
                editor.uploadVideo(fileName, filePath)
                cy.wait(1000)
            })

            cy.then2('I see error message', () => {
                expect(editor.getErrorFileUpload()).to.exist;
            })

            Cypress.on('uncaught:exception', () => {
                return false
            })
        })
    });

    describe("EP010 add a audio valid to a post - APRIORI", () => {
        it('should add a valid audio', () => {
            const fileName = datosValidos[6].name_image;
            const filePath = 'cypress/fixtures/Post/files/audio-valid-post.mp3';

            cy.ands('I visit post page', () => {
                post.visit()
            })

            cy.ands('I click on new post page', () => {
                post.clickNewPost()
            })

            cy.ands('I click in more option', () => {
                editor.clickOptionMore('Audio');
            })

            cy.when('I upload audio', () => {
                editor.uploadAudio(fileName, filePath)
                cy.wait(1000)
            })

            cy.then2('I see the audio into post', () => {
                expect(editor.getImage(fileName)).exist
            })
        })
    });

    describe("EP011 add a audio invalid to a post - APRIORI", () => {
        it('should add a invalid audio', () => {
            const fileName = datosValidos[7].name_image;
            const filePath = 'cypress/fixtures/Post/files/invalid-file.json';

            cy.ands('I visit post page', () => {
                post.visit()
            })

            cy.ands('I click on new post page', () => {
                post.clickNewPost()
            })

            cy.ands('I click in more option', () => {
                editor.clickOptionMore('Audio');
            })

            cy.when('I upload audio', () => {
                editor.uploadAudio(fileName, filePath)
                cy.wait(1000)
            })

            Cypress.on('uncaught:exception', () => {
                cy.log('I see error message')
                return false
            })
        })
    });

    describe("EP012 add a gallery valid to a post - APRIORI", () => {
        it('should add a valid gallery', () => {
            const fileNamesPahts = [];
            const numberImages = 5;
            cy.ands('I visit post page', () => {
                post.visit()
            })

            cy.ands('I click on new post page', () => {
                post.clickNewPost()
            })

            cy.ands('I click in more option', () => {
                editor.clickOptionMore('Gallery');
            })

            cy.ands('I create files path', () => {
                for (let i = 0; i < numberImages; i++) {
                    fileNamesPahts.push({
                        fileName: datosValidos[7].name_image,
                        filePath: `cypress/fixtures/Post/files/image-valid-post-0${i + 1}.png`
                    })
                }
            })

            cy.when('I upload gallery', () => {
                editor.uploadGaleryImages(fileNamesPahts)
                cy.wait(1000)
            })

            cy.then2('I see the imagves into gallery post', () => {
                fileNamesPahts.forEach((fileName) => {
                    expect(editor.getImage(fileName.fileName)).exist
                })
            })
        })
    })

    describe("EP013 add limit images to a gallery post - APRIORI", () => {
        it('should add a valid gallery', () => {
            const fileNamesPahts = [];
            const numberImages = 9;

            cy.ands('I visit post page', () => {
                post.visit()
            })

            cy.ands('I click on new post page', () => {
                post.clickNewPost()
            })

            cy.ands('I click in more option', () => {
                editor.clickOptionMore('Gallery');
            })

            cy.ands('I create files path', () => {
                for (let i = 0; i < numberImages; i++) {
                    fileNamesPahts.push({
                        fileName: datosValidos[7].name_image,
                        filePath: `cypress/fixtures/Post/files/image-valid-post-0${i + 1}.png`
                    })
                }
            })

            cy.when('I upload gallery', () => {
                editor.uploadGaleryImages(fileNamesPahts)
                cy.wait(1000)
            })

            cy.then2('I see the imagves into gallery post', () => {
                fileNamesPahts.forEach((fileName) => {
                    expect(editor.getImage(fileName.fileName)).exist
                })
            })
        })
    })

    describe("EP014 add more to limit images to a gallery post - APRIORI", () => {
        it('should add a valid gallery', () => {
            const fileNamesPahts = [];
            const numberImages = 10;

            cy.ands('I visit post page', () => {
                post.visit()
            })

            cy.ands('I click on new post page', () => {
                post.clickNewPost()
            })

            cy.ands('I click in more option', () => {
                editor.clickOptionMore('Gallery');
            })

            cy.ands('I create files path', () => {
                for (let i = 0; i < numberImages; i++) {
                    fileNamesPahts.push({
                        fileName: datosValidos[7].name_image,
                        filePath: `cypress/fixtures/Post/files/image-valid-post-${i + 1 > 9 ? '' : '0'}${i + 1}.png`
                    })
                }
            })

            cy.when('I upload gallery', () => {
                editor.uploadGaleryImages(fileNamesPahts)
                cy.wait(1000)
            })

            cy.then2('I see an alert with maximum images', () => {
                expect(editor.getErrorGalleryUpload()).to.exist;
            })
        })
    })

})