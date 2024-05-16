module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    './dev/style/main.css':'./source/style/main.less'
                }
            },
            production: {
                options: {
                    compress: true
                },
                files: {
                    './dist/style/main.min.css': './source/style/main.less'
                }
            }
        },
        watch:{
            less:{
                files:['source/styles/**/*.less'],
                tasks:['less:development']
            },
            html:{
                files:['source/index.html'],
                tasks:['replace:dev']
            }
        },
        concurrent:{
            target:['less']
        },
        replace:{
            dev:{
                options:{
                    patterns:[{
                        match:'ENDERECO-CSS',
                        replacement:'./style/main.css'},
                        
                        {match:'ENDERECO-jS',
                        replacement:'./scripts/main.js'}
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten:true,
                        src:['source/index.html'],
                        dest:'dev/'
                    }
                ]

            },
            dist:{
                options:{
                    patterns:[{
                        match:'ENDERECO-CSS',
                        replacement:'./style/main.min.css'},
                        
                        {match:'ENDERECO-jS',
                        replacement:'./scripts/main.min.js'}
                    ]
                },
                files:[
                    {
                        expand:true,
                        flatten:true,
                        src:['prebuild/index.html'],
                        dest:'dist/'
                    }
                ]
                
            }
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments:true,
                    collapseWhitespace:true
                },
                files:{
                    'prebuild/index.html':'source/index.html'
                }
            }
        },
        clean:
        ['.prebuild'],
        
        uglify:{
            target:{
                files:{
                    'dist/script/main.min.js':'source/scripts/main.js'
                }
            }
        },
    });

    //CARREGAMENTO DOS PLUGINS

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-uglify')

    //Tarefa DEFAULT
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build',['less:production', 'htmlmin:dist', 'replace:dist', 'clean','uglify']);
};
