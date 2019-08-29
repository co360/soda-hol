var labGuide = angular.module('labGuide', ['ngMaterial', 'ngSanitize']);

labGuide.config(function ($mdThemingProvider) {
    var whiteBackground = $mdThemingProvider.extendPalette('grey', {
      '50': '#fefefe'
    });
    $mdThemingProvider.definePalette('whiteBackground', whiteBackground);
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange')
        .warnPalette('red')
        .backgroundPalette('whiteBackground');
    /*$mdThemingProvider.theme('ttc')
        .primaryPalette('blue')
        .accentPalette('light-blue')
        .warnPalette('red')
        .backgroundPalette('whiteBackground');
    $mdThemingProvider.theme('theme-0')
        .primaryPalette('deep-purple')
        .accentPalette('amber')
        .warnPalette('red')
        .backgroundPalette('whiteBackground');
    $mdThemingProvider.theme('theme-1')
        .primaryPalette('light-green')
        .accentPalette('amber')
        .warnPalette('red')
        .backgroundPalette('whiteBackground');
    $mdThemingProvider.theme('theme-2')
        .primaryPalette('amber')
        .accentPalette('blue')
        .warnPalette('brown')
        .backgroundPalette('whiteBackground');*/
    $mdThemingProvider.alwaysWatchTheme(true);
});

labGuide.controller('labGuideController', ['$scope', '$http', '$mdSidenav', '$sanitize', '$sce', '$mdDialog', '$mdToast' 
  , function ($scope, $http, $mdSidenav, $sanitize, $sce, $mdDialog, $mdToast) {
      $scope.toast = $mdToast;
      $scope.toastPromise = {};
      $scope.showCustomToast = function(data, delay, showReload, alwaysShow) {
        if($scope.selection === 'lab' || alwaysShow) {
          $mdToast.show({
            hideDelay   : delay,
            position    : 'bottom right',
            scope       : $scope,
            preserveScope : true,
            parent      : document.querySelector('#toastHolder'),
            controllerAs     : 'toast',
            bindToController : true,
            template : '<md-toast> \
                          <span class="md-toast-text">'+ data.text +'</span>' +
                          (showReload ? '<md-button class="md-highlight" ng-click="refreshLabGuide($event)"> Reload </md-button> ' : '') +
                           '<md-button ng-click="closeToast()"> \
                             Close \
                           </md-button> \
                        </md-toast>'
                      }).then(() => console.log('toast closed!'));
          }
        };

        $scope.closeToast = function() {
          $mdToast.hide();
        }

        //$scope.theme = 'default';
        $scope.selection = "";

//        READ MANIFEST - THEME, INTERACTIVE, MENU
        $http.get('manifest.json')
          .then(
            function (res) {
              //$scope.version = {};
              $scope.manifest = res.data;
              console.log("json",$scope.manifest)
              if($scope.manifest.workshop.interactive){
                // $scope.enableInteractive = true;
                $scope.interactive = {
                      src: $scope.manifest.workshop.interactive
                      , title: "Interactive Tour"
                  };
              }

              // if($scope.manifest.workshop.theme){
              //     console.log("Theme selected",$scope.manifest.workshop.theme);
              //     if($scope.manifest.workshop.theme == 'ttc'){
              //         $scope.theme = 'ttc';
              //     }
              // }

              preparePage();
            }, 
            function (err) {
              console.log('Error getting manifest.json!');
              console.log(err);
            }
          );

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }
        var preparePage = function() {
          if (parseQueryString()) {
            console.log('Parsed query string. Going to: ' + $scope.currentFilename);

            $scope.getLabGuide({
              filename: $scope.currentFilename
            });
          } else {
            $scope.showHomePage();
          }
        };

        var parseQueryString = function() {
          var success = false;
          if ('URLSearchParams' in window) {
            let searchParams = new URLSearchParams(window.location.search);
            console.log('Query Params:');
            console.log(searchParams.get("page"));

            let page = searchParams.get("page");

            if (page) {
              $scope.currentFilename = page || undefined;
              success = true;
            }
          }

          return success;
        }

        // $scope.$watch('version.selected', function() {
        //   if(typeof $scope.version == 'undefined' || typeof $scope.version.selected ==='undefined') {
        //     $scope.theme = 'default';
        //   }

        //   if($scope.manifest && 'undefined' != typeof $scope.version.selected) {
        //     console.log('Version selcted: ' + $scope.version.selected);
        //     var themeNumber = $scope.versionsAvailable.findIndex(elem => elem.name === $scope.version.selected);
        //     if(themeNumber >= 0) {
        //       $scope.theme = 'theme-' + themeNumber;
        //     }
        //     else $scope.theme = 'default';

        //     //check this list for the filename in the query string -- if there, choose it. if not there, revert to 0th entry and give an error toast.
        //     let labsInThisVersion = $scope.manifest.workshop.labs.filter(lab => lab.labels && lab.labels.version == $scope.version.selected);
        //     if(labsInThisVersion.length > 0) {
        //       var newLab = labsInThisVersion.find(elem => elem.filename === $scope.currentFilename) || labsInThisVersion[0];
        //       var filename = "";
        //       if(newLab) {
        //           filename = newLab.filename;
        //       }
        //       if(filename != "") {
        //         $scope.previousSelection = $scope.selection;
        //         $scope.selection = "lab";
        //         $scope.currentFilename = filename;
        //         $scope.getLabGuide({ filename: filename});
        //       }
        //     }
        //     else { //Version in query string not found
        //       console.log('Version: ' + $scope.version.selected + ' not found');
        //       $scope.showCustomToast({'text': 'Version: ' + $scope.version.selected + ' not found!'}, 5000, false, true);
        //       $scope.showHomeOrVersionSelectPage();
        //     }
        //   }
        // }, true);

        // $scope.resetVersionAndFilename = function() {
        //   history.replaceState('', '', window.location.pathname);
        //   $scope.currentFilename = "";
        //   $scope.previousSelection = $scope.selection;
        //   $scope.selection = "chooseVersion";
        //   $scope.version.selected = undefined;
        //   // updateFilenameInHeader(undefined);
        // }

        $scope.showHomePage = function() {
          $scope.getLabGuide({
            filename: 'README.md'
          });
        };

        // $scope.showOrHideInteractiveTour = function() {
        //   if($scope.selection == 'interactive') {
        //     $scope.selection = $scope.previousSelection;
        //     $scope.previousSelection = 'interactive';
        //   }
        //   else {
        //     $scope.previousSelection = $scope.selection;
        //     $scope.selection = 'interactive';
        //   }
        // };

        $scope.loadContent = function (page) {
            console.log('Loading page: ' + page);

            $http.get(page)
              .then(function (res) {
                console.log('Got page: ' + page);
                var converter = new showdown.Converter({tables: true})
                  , text = res.data;
                converter.setFlavor('github');

                var html = converter.makeHtml(text);

                $scope.htmlContent = html;
                $scope.selection = 'lab';
                page.htmlContent = html;
                setTimeout(function () {
                    $("#labguide h2").next("h3").addClass("first-in-section");
                    $("#labguide h3").nextUntil("#labguide h1, #labguide h2, #labguide h3").hide();
                    $("#labguide h3").addClass('plus');
                    $("#labguide h3").unbind('click', stepClickHandler);
                    $("#labguide h3").click(stepClickHandler);
                    window.scrollTo(0, 0);
                }, 0);
              }, 
              function (err) {
                $scope.showCustomToast({'text': 'File: ' + page + ' not found!'}, 5000, false, true);
                $scope.showHomePage();
                console.log('Error getting lab guide markdown!');
                console.log(err);
              }
            );
        }
        // var updateFilenameInHeader = function(filename) {
        //   var headerElement = document.getElementsByTagName('h2')[0];
        //   var labElement = document.createElement('span');
        //   labElement.textContent = '- ' + filename;

        //   if(headerElement.children[1])
        //     headerElement.removeChild(headerElement.children[1]);

        //   if(filename)
        //     headerElement.appendChild(labElement);

        // }

        // var loadPage = window.history.state;
        // window.onpopstate = function(event) {
        //   console.log('popstate event was fired');

        //     if (loadPage) {
        //     }

        // };

        $scope.getLabGuide = function (lab) {
            $scope.currentFilename = lab.filename;

            if ('URLSearchParams' in window) {
              var searchParams = new URLSearchParams(window.location.search);

              searchParams.set("page", lab.filename);

              var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();

              history.replaceState(null, '', newRelativePathQuery);
            }

            $scope.loadContent(lab.filename);

            setTimeout(function () {
              $("#labguide a").each(function () {
                if (this.href.endsWith('.md')) {
                  $(this).on("click", function (event) {
                    event.preventDefault();
                    console.log('clicked on: ' + this.getAttribute('href'));
                    $scope.getLabGuide({
                      filename: this.getAttribute('href')
                    });
                  });
                }
              })
            }, 500);
        }

        stepClickHandler = function (e) {
          var fadeOutStep = function (step) {
            $(step).nextUntil("#labguide h1, #labguide h2, #labguide h3").fadeOut();
            $(step).addClass('plus');
            $(step).removeClass('minus');
          };

          var fadeInStep = function (step) {
            $(step).nextUntil("#labguide h1, #labguide h2, #labguide h3").fadeIn();
            $(step).addClass('minus');
            $(step).removeClass('plus');
          };

          if (e.offsetY < 0) { //user has clicked above the H3, in the expand/collapse all button
            if ($(this).hasClass('first-in-section') && $(this).hasClass('plus')) {
              fadeInStep($(this));

              $(this).nextUntil("#labguide h1, #labguide h2", "h3").each(function (i, e) {
                return fadeInStep(e);
              });
            }
            else if ($(this).hasClass('first-in-section') && $(this).hasClass('minus')) {
              fadeOutStep($(this));

              $(this).nextUntil("#labguide h1, #labguide h2", "h3").each(function (i, e) {
                return fadeOutStep(e);
              });
            }
          } else { //user has clicked in the H3, only work on this step
            if ($(this).hasClass('plus')) {
              fadeInStep($(this));
            }
            else if ($(this).hasClass('minus')) {
              fadeOutStep($(this));
            }
          }
        };

        $scope.toggleLeft = function () {
            $mdSidenav('left').toggle();
        };

        $scope.close = function () {
            $mdSidenav('left').close();
        };
    }]);
