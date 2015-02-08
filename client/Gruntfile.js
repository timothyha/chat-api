module.exports = function (grunt) {

    grunt.initConfig({
        uglify: {
            my_target: {
                files: {
                    'www/js/jchat.min.js': [
                        'www/js/libs/jquery/jquery.js',
						'www/js/libs/swiper/swiper.js',
						'www/js/libs/swiper/scrollbar.js',
                        'www/js/libs/moments/moment.js',
                        'www/js/libs/finch/finch.js',
                        'www/js/mbinder.js',
                        'www/js/mchat-list.js',
                        'www/js/mchat-service.js',                        
                        'www/js/mdialog.js',
                        'www/js/mglobal.js',
                        'www/js/mpage-manager.js',
                        'www/js/msend-panel.js',
                        'www/js/mside-panel.js',
                        'www/js/mtoogle-group.js',
                        'www/js/mtoolbar.js'
                    ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.registerTask('default', ['uglify']);
};